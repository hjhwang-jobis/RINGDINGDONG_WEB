import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { BaseModal, ErrorInfo, Modal, useModal } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import { InfiniteData } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import ImagePreview from '~/components/ImagePreview'
import InfiniteImageGrid from '~/components/InfiniteImageGrid'
import Loader from '~/components/Loader'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import {
  FriendtalkTemplateType,
  FriendtalkTemplateTypeMap,
} from '~/friendtalk/constants'
import { useGetFriendtalkTemplateImagesListInfiniteQuery } from '~/hooks/queries/friendtalk/useGetFriendtalkTemplateImagesListInfiniteQuery'
import { ImageDescription } from '~/types'
import { GetFriendtalkTemplatesImagesList, Response } from '~/types/api'
import { apiUtils } from '~/utils'

interface Props {
  name: string
  templateType: FriendtalkTemplateType
  disabled?: boolean
  required?: boolean
  unselectableImageIds?: string[]
  onChange?: (id: string) => void
  imageUrl?: string
}

export default function FormRowFriendtalkTemplateImageSearch({
  name,
  templateType,
  disabled = false,
  required = false,
  unselectableImageIds = [],
  onChange,
  imageUrl: imageUrlFromProps = '',
}: Props) {
  const { control, trigger } = useFormContext()
  const { showModal } = useModal()
  const [imageUrl, setImageUrl] = useState(imageUrlFromProps)

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
                    templateType,
                    unselectableImageIds,
                    callback: async (imageDescription) => {
                      setImageUrl(imageDescription.url)
                      field.onChange(imageDescription.id)
                      await trigger()
                      onChange?.(imageDescription.id)
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
  response?: InfiniteData<Response<GetFriendtalkTemplatesImagesList.Response>>
): ImageDescription[] => {
  if (!response || !response.pages || response.pages.length === 0) return []

  return response.pages
    .flatMap((group) => [...group.data.contents])
    .map(({ id, url, originFileName }) => ({
      id: `${id}`,
      url,
      name: originFileName,
    }))
}

interface ImageSearchModalProps extends BaseModal {
  templateType: FriendtalkTemplateType
  callback: (imageDescription: ImageDescription) => void
  unselectableImageIds: string[]
}

const ImageSearchModal = ({
  modalKey,
  templateType,
  callback,
  unselectableImageIds,
}: ImageSearchModalProps) => {
  const [id, setId] = useState('')

  const {
    data: response,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGetFriendtalkTemplateImagesListInfiniteQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNo: DEFAULT_PAGE_NO - 1,
      direction: SortDirection.DESC,
      templateType,
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
      title={`친구톡 이미지 목록(${FriendtalkTemplateTypeMap[templateType]})`}
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
          title="친구톡 템플릿 이미지 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && imageDescriptions.length > 0 ? (
        <InfiniteImageGrid
          imageDescriptions={imageDescriptions}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage ?? false}
          fetchNextPage={() => fetchNextPage()}
          onSelected={(id) => setId(id)}
          unselectableImageIds={unselectableImageIds}
        />
      ) : null}
    </Modal>
  )
}
