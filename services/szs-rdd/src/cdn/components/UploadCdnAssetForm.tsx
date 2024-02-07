import { Spacing } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { RADIO_OPTION_LIST_CDN_ASSET_GROUP_FOR_UPLOAD } from '~/cdn/constants'
import FormRowImageUploader from '~/components/FormRowImageUploader'
import FormRowRadio from '~/components/FormRowRadio'
import KeyValueTable from '~/components/KeyValueTable'
import {
  CdnAssetGroup,
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  FileByteSize,
  FileType,
} from '~/constants'
import { usePostCdnAssetsMutation } from '~/hooks/queries/cdn/usePostCdnAssetsMutation'
import { RoutePath } from '~/routes'
import { FileDescription } from '~/types'
import { apiUtils } from '~/utils'

interface FormData {
  assetGroup: CdnAssetGroup
  image: File | null
  imageList: FileDescription[]
}

const imageUploaderConfigMap = {
  [CdnAssetGroup.Push]: {
    imageDimensions: {
      min: {
        width: 100,
        height: 100,
      },
      max: {
        width: 2400,
        height: 2400,
      },
    },
    imageRatioRange: {
      min: {
        width: 1,
        height: 1,
      },
      max: {
        width: 1,
        height: 1,
      },
    },
    fileTypes: [FileType.jpg, FileType.png],
    fileByteSize: FileByteSize._10MB,
  },
  [CdnAssetGroup.AlimList]: {
    imageDimensions: {
      min: {
        width: 267,
        height: 120,
      },
      max: {
        width: 267,
        height: 120,
      },
    },
    fileTypes: [FileType.jpg, FileType.png],
    fileByteSize: FileByteSize._10MB,
  },
}

export default function UploadCdnAssetForm() {
  const [searchParams] = useSearchParams({
    assetGroup: CdnAssetGroup.AlimList,
  })
  const initialFormData: FormData = {
    assetGroup: searchParams.get('assetGroup') as CdnAssetGroup,
    image: null,
    imageList: [],
  }
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...initialFormData,
    },
  })

  const navigate = useNavigate()
  const { mutate, error, isLoading } = usePostCdnAssetsMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.CdnAsset}/${RoutePath.CdnAssetList}?size=${DEFAULT_PAGE_SIZE}&page=${DEFAULT_PAGE_NO}&assetGroup=${assetGroup}`
      ),
  })

  const assetGroup = methods.watch('assetGroup')
  // NOTE: 템플릿타입이 바뀌면, 업로드해둔 이미지가 삭제됩니다.
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'assetGroup') {
        methods.setValue('image', null)
        methods.setValue('imageList', [])
      }
    })

    return () => subscription.unsubscribe()
  }, [methods])

  // NOTE: API 상으로는 Alimtalk 타입을 지원하지만, 기획상으로는 Alimtalk 타입을 사용하지 않습니다. 이에 대한 방어코드입니다.
  const imageUploaderConfig =
    assetGroup === CdnAssetGroup.AlimTalk
      ? imageUploaderConfigMap[CdnAssetGroup.AlimList]
      : imageUploaderConfigMap[assetGroup]

  const onSubmit = (data: FormData) => {
    const formData = new FormData()
    const { image, assetGroup } = data
    if (image) {
      formData.append('file', image)
    }

    mutate({
      body: formData,
      assetGroup,
    })
  }

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="CDN 이미지 업로드 실패"
            message={apiUtils.getApiErrorMessage(error)}
          />
          <Spacing px={10} />
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <KeyValueTable.Root>
            <KeyValueTable.KeyColumn>이미지 타입</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowRadio
                name={'assetGroup'}
                options={RADIO_OPTION_LIST_CDN_ASSET_GROUP_FOR_UPLOAD}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>이미지 업로드</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowImageUploader
                imageUploaderName={'image'}
                thumbnailListName={'imageList'}
                imageUploaderConfig={imageUploaderConfig}
                onChange={(fileDescription) =>
                  methods.setValue('imageList', [fileDescription])
                }
                onDelete={() => methods.setValue('image', null)}
                disabled={isLoading}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>업로드</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <Button
                type="submit"
                size="small"
                disabled={!methods.formState.isValid || isLoading}
              >
                업로드
              </Button>
            </KeyValueTable.ValueColumn>
          </KeyValueTable.Root>
        </form>
      </FormProvider>
    </>
  )
}
