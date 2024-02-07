import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorInfo } from '@3o3-internal/components'
import { BaseModal, Modal, useModal } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { InfiniteData } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
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
                    callback: (imageDescription) => {
                      setImageUrl(imageDescription.url)
                      field.onChange(imageDescription.url)
                      trigger()
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
  if (!response || !response.pages || response.pages.length === 0) return []

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
  const idRef = useRef('')

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
      assetGroup: CdnAssetGroup.AlimList,
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
      title={`알림리스트 이미지 목록(${
        CdnAssetGroupMap[CdnAssetGroup.AlimList]
      })`}
      onOkClick={() => {
        const found = imageDescriptions.find((v) => `${v.id}` === idRef.current)
        if (found) {
          callback(found)
        }
      }}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="알림리스트 이미지 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && imageDescriptions.length > 0 ? (
        <InfiniteImageGrid
          imageDescriptions={imageDescriptions}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage ?? false}
          fetchNextPage={() => fetchNextPage()}
          onSelected={(id) => (idRef.current = id)}
          unselectableImageIds={[]}
        />
      ) : null}
    </Modal>
  )
}
