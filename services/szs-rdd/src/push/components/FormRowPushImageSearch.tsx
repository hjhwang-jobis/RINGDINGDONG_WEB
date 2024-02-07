import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorInfo } from '@3o3-internal/components'
import { BaseModal, Modal, useModal } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { InfiniteData } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import ImagePreview from '~/components/ImagePreview'
import InfiniteImageGrid from '~/components/InfiniteImageGrid'
import Loader from '~/components/Loader'
import {
  CdnAssetGroup,
  CdnAssetGroupMap,
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from '~/constants'
import { useGetCdnAssetsListInfiniteQuery } from '~/hooks/queries/cdn/useGetCdnAssetsListInfiniteQuery'
import { ImageDescription } from '~/types'
import { GetCdnAssetsList, Response } from '~/types/api'
import { apiUtils } from '~/utils'

interface Props {
  name: string
  disabled?: boolean
  required?: boolean
  imageUrl?: string
}

export default function FormRowPushImageSearch({
  name,
  disabled = false,
  required = false,
  imageUrl: imageUrlProps = '',
}: Props) {
  const { control, trigger } = useFormContext()
  const { showModal } = useModal()
  const [imageUrl, setImageUrl] = useState(imageUrlProps)

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (v) => {
          if (required && (!v || v < 0)) {
            return '이미지를 설정해주세요'
          }

          return true
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <>
            {imageUrl ? (
              <ImagePreview src={imageUrl} />
            ) : (
              <Text typography="body14" weight="regular">
                이미지가 없습니다.
              </Text>
            )}
            <Spacing px={10} />
            {!disabled && (
              <Button
                type="button"
                variant="lineBlue"
                size="small"
                onClick={() =>
                  showModal(ImageSearchModal, {
                    callback: async (imageDescription) => {
                      setImageUrl(imageDescription.url)
                      field.onChange(imageDescription.url)
                      await trigger()
                    },
                  })
                }
              >
                이미지 검색하기
              </Button>
            )}
            {!disabled && fieldState.error ? (
              <>
                <Spacing px={10} />
                <Text
                  typography="body14"
                  weight="regular"
                  color={colors.light.scheme.$red60}
                >
                  {fieldState.error.message}
                </Text>
              </>
            ) : null}
          </>
        )
      }}
    />
  )
}

const toImageDescriptions = (
  response?: InfiniteData<Response<GetCdnAssetsList.Response>>
): ImageDescription[] => {
  if (!response || !response.pages) return []

  return response.pages
    .flatMap((group) => [...group.data.contents])
    .map(({ assetId: id, fullAssetUrl: url, originName: name }) => ({
      id,
      url,
      name,
    }))
}

interface ImageSearchModalProps extends BaseModal {
  callback: (imageDescription: ImageDescription) => void
}

const ImageSearchModal = ({ modalKey, callback }: ImageSearchModalProps) => {
  const [id, setId] = useState('')

  const {
    data: response,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGetCdnAssetsListInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
      assetGroup: CdnAssetGroup.Push,
    },
    {}
  )

  const imageDescriptions = toImageDescriptions(response)

  return (
    <Modal
      modalKey={modalKey}
      hasCancel
      cancelVariant="secondary"
      size="xl"
      title={`푸시 이미지 목록(${CdnAssetGroupMap[CdnAssetGroup.Push]})`}
      onOkClick={() => {
        const found = imageDescriptions.find((v) => `${v.id}` === id)
        if (found) {
          callback(found)
        }
      }}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="푸시 이미지 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && imageDescriptions.length > 0 ? (
        <InfiniteImageGrid
          imageDescriptions={imageDescriptions}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage ?? false}
          fetchNextPage={() => fetchNextPage()}
          onSelected={(id) => setId(id)}
          unselectableImageIds={[]}
        />
      ) : null}
    </Modal>
  )
}
