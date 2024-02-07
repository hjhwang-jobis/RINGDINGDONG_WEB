import { Spacing } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowImageUploader from '~/components/FormRowImageUploader'
import FormRowRadioFriendtalkTemplateType from '~/components/FormRowRadioFriendtalkTemplateType'
import KeyValueTable from '~/components/KeyValueTable'
import { FileByteSize, FileType } from '~/constants'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import { usePostFriendtalkTemplateImagesMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkTemplateImagesMutation'
import { RoutePath } from '~/routes'
import { FileDescription } from '~/types'
import { apiUtils } from '~/utils'

interface FormData {
  templateType: FriendtalkTemplateType
  image: File | null
  imageList: FileDescription[]
}

const imageUploaderConfigMap = {
  [FriendtalkTemplateType.BASE]: {
    imageDimensions: {
      min: {
        width: 500,
        height: 250,
      },
      max: {
        width: Infinity,
        height: Infinity,
      },
    },
    fileTypes: [FileType.jpg, FileType.png],
    fileByteSize: FileByteSize._500KB,
  },
  [FriendtalkTemplateType.CAROUSEL]: {
    imageDimensions: {
      min: {
        width: 500,
        height: 250,
      },
      max: {
        width: Infinity,
        height: Infinity,
      },
    },
    imageRatioRange: {
      min: {
        width: 3,
        height: 4,
      },
      max: {
        width: 2,
        height: 1,
      },
    },
    fileTypes: [FileType.jpg, FileType.png],
    fileByteSize: FileByteSize._500KB,
  },
  [FriendtalkTemplateType.WIDE_IMAGE]: {
    imageDimensions: {
      min: {
        width: 800,
        height: 600,
      },
      max: {
        width: 800,
        height: 600,
      },
    },
    fileTypes: [FileType.jpg, FileType.png],
    fileByteSize: FileByteSize._2MB,
  },
  [FriendtalkTemplateType.WIDE_LIST]: {
    imageDimensions: {
      min: {
        width: 400,
        height: 400,
      },
      max: {
        width: 800,
        height: 400,
      },
    },
    fileTypes: [FileType.jpg, FileType.png],
    fileByteSize: FileByteSize._2MB,
  },
}

export default function UploadFriendtalkTemplateImageForm() {
  const initialFormData: FormData = {
    templateType: FriendtalkTemplateType.BASE,
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
  const { mutate, error, isLoading } = usePostFriendtalkTemplateImagesMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.FriendtalkTemplateImage}/${RoutePath.FriendtalkTemplateImageList}`
      ),
  })

  const templateType = methods.watch('templateType')
  // NOTE: 템플릿타입이 바뀌면, 업로드해둔 이미지가 삭제됩니다.
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'templateType') {
        methods.setValue('image', null)
        methods.setValue('imageList', [])
      }
    })

    return () => subscription.unsubscribe()
  }, [methods])

  const imageUploaderConfig = imageUploaderConfigMap[templateType]

  const onSubmit = (data: FormData) => {
    const formData = new FormData()
    const { image, templateType } = data
    if (image) {
      formData.append('file', image)
    }

    mutate({
      body: formData,
      type: templateType,
    })
  }

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="친구톡 템플릿 이미지 업로드 실패"
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
              <FormRowRadioFriendtalkTemplateType name={'templateType'} />
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
                onDelete={() => {
                  methods.setValue('image', null)
                }}
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
