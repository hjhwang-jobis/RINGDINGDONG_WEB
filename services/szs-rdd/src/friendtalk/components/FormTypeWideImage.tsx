import { Spacing } from '@3o3/mystique-components'
import {
  ConfirmModal,
  ErrorInfo,
  ErrorModal,
  useModal,
} from '@3o3-internal/components'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowAutoFillParameters from '~/components/FormRowAutoFillParameters'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowRadioFriendtalkTemplateType from '~/components/FormRowRadioFriendtalkTemplateType'
import FormRowSelectSendProfile from '~/components/FormRowSelectSendProfile'
import FormRowTextArea from '~/components/FormRowTextArea'
import FormRowTextTemplateCode from '~/components/FormRowTextTemplateCode'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import ImagePreview from '~/components/ImagePreview'
import KeyValueTable from '~/components/KeyValueTable'
import SectionFormSendTestMessageForm from '~/components/SectionFormSendTestMessage'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import {
  FormTypeWideImageData,
  FriendtalkButtonWideImageType,
} from '~/friendtalk/types'
import {
  formTypeMapNameTree,
  sanitizeFriendtalkButton,
} from '~/friendtalk/utils'
import { usePostFriendtalkSendMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkSendMutation'
import { usePostFriendtalkTemplatesBaseMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkTemplatesBaseMutation'
import { RoutePath } from '~/routes'
import { ParameterField, ParameterMap } from '~/types'
import { PostFriendtalkTemplatesBase } from '~/types/api'
import { apiUtils } from '~/utils'
import {
  autoFillParameterUtils,
  parameterUtils,
  requestParameterUtils,
  validators,
} from '~/utils'

import FormRowFriendtalkTemplateImageSearch from './FormRowFriendtalkTemplateImageSearch'
import FormRowTextMessageName from './FormRowTextMessageName'
import FormTypeWideImageRowFriendtalkButton from './FormTypeWideImageRowFriendtalkButton'

interface Props {
  data: FormTypeWideImageData
  onChangeTemplateType: (v: FormTypeWideImageData) => void
  readOnly?: boolean
}

const concatTexts = (
  description: string,
  comment: string,
  items: FriendtalkButtonWideImageType[]
) => {
  const textFromItems = items.reduce((acc, v) => {
    return `${acc}${v.name}`
  }, '')

  return `${description}${comment}${textFromItems}`
}

const sanitizeData = (
  data: FormTypeWideImageData
): PostFriendtalkTemplatesBase.Request => {
  return {
    sendProfile: data.sendProfile,
    templateCode: data.templateCode,
    templateType: data.templateType,
    description: data.description,
    requestParameter: data.requestParameter,
    autoFillParameter: data.autoFillParameter,
    item: {
      imageId: data.contentTypeWideImage.imageId,
      imageLink: data.contentTypeWideImage.imageLink,
      comment: data.contentTypeWideImage.comment,
      buttons: data.contentTypeWideImage.buttons
        .filter((v) => v.isShow)
        .map((v) => sanitizeFriendtalkButton(v)),
    },
    wide: true,
  }
}

export default function FormTypeWideImage({
  data,
  onChangeTemplateType,
  readOnly = false,
}: Props) {
  const replacableText = concatTexts(
    data.description,
    data.contentTypeWideImage.comment,
    data.contentTypeWideImage.buttons
  )
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...data,
      autoFillParameterFieldList:
        autoFillParameterUtils.createAutoFillParameterFieldListFromText(
          replacableText,
          data.autoFillParameter
        ),
      requestParameter:
        requestParameterUtils.createRequestParameterFromText(replacableText),
    },
  })

  const navigate = useNavigate()
  const { mutate, error } = usePostFriendtalkTemplatesBaseMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateList}`
      ),
  })
  const onSubmit = (data: FormTypeWideImageData) => mutate(sanitizeData(data))

  const { showModal } = useModal()
  const { mutate: mutateSendMessage } = usePostFriendtalkSendMutation({
    onSuccess: () => {
      showModal(ConfirmModal, {
        title: '메시지 발송 성공',
      })
    },
    onError: (error) => {
      showModal(ErrorModal, {
        title: '메시지 발송 실패',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  // NOTE: 자동치환자 단어 처리
  const updateReplaceableTextVariables = useCallback(() => {
    parameterUtils.updateAutoFillNRequestParameters({
      getTexts: () =>
        concatTexts(
          methods.getValues('description'),
          methods.getValues('contentTypeWideImage.comment'),
          methods.getValues('contentTypeWideImage.buttons')
        ),
      getAutoFillParameterFieldList: () =>
        methods.getValues('autoFillParameterFieldList'),
      setValueAutoFillParameter: (autoFillParameter: ParameterMap) =>
        methods.setValue('autoFillParameter', autoFillParameter),
      setValueRequestParameter: (requestParameter: string[]) =>
        methods.setValue('requestParameter', requestParameter),
      replaceAutoFillParameterFieldArray: (
        autoFillParameterFieldList: ParameterField[]
      ) =>
        methods.setValue(
          'autoFillParameterFieldList',
          autoFillParameterFieldList
        ),
    })
  }, [methods])

  const selectedImageId = methods.watch('contentTypeWideImage.imageId')
  const hasImage = selectedImageId > 0

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="친구톡(와이드 이미지) 생성 오류"
            message={apiUtils.getApiErrorMessage(error)}
          />
          <Spacing px={10} />
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <KeyValueTable.Root>
            <KeyValueTable.KeyColumn>발신 프로필</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowSelectSendProfile
                name={formTypeMapNameTree.sendProfile.getName()}
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>메시지 타입</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowRadioFriendtalkTemplateType
                name={formTypeMapNameTree.templateType.getName()}
                readOnly={readOnly}
                onChange={() => onChangeTemplateType(methods.getValues())}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>템플릿 코드</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowTextTemplateCode
                name={formTypeMapNameTree.templateCode.getName()}
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>메시지 이름</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowTextMessageName
                name={formTypeMapNameTree.description.getName()}
                disabled={readOnly}
                onBlur={updateReplaceableTextVariables}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>소재 영역</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {readOnly ? (
                <ImagePreview src={data.contentTypeWideImage.imageUrl} />
              ) : (
                <FormRowFriendtalkTemplateImageSearch
                  name={formTypeMapNameTree.contentTypeWideImage.imageId.getName()}
                  templateType={FriendtalkTemplateType.WIDE_IMAGE}
                  disabled={readOnly}
                  unselectableImageIds={[`${selectedImageId}`]}
                  imageUrl={data.contentTypeWideImage.imageUrl}
                  required
                />
              )}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>이미지 링크</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={formTypeMapNameTree.contentTypeWideImage.imageLink.getName()}
                validateInRules={(v) =>
                  validators.run([validators.validateInRulesFormatUrl(v)])
                }
                disabled={readOnly || !hasImage}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>홍보 문구</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <KeyValueTable.ValueColumn>
                <FormRowTextArea
                  name={formTypeMapNameTree.contentTypeWideImage.comment.getName()}
                  min={5}
                  max={76}
                  disabled={readOnly}
                  onBlur={updateReplaceableTextVariables}
                />
              </KeyValueTable.ValueColumn>
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormTypeWideImageRowFriendtalkButton
                idx={0}
                disabled={readOnly}
                onBlurButtonName={updateReplaceableTextVariables}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>
              자동 치환 파라미터
            </KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowAutoFillParameters
                name="autoFillParameterFieldList"
                disabled={readOnly}
                onBlur={updateReplaceableTextVariables}
              />
            </KeyValueTable.ValueColumn>
            {!readOnly && (
              <FormRowValidateNSubmit
                onValidate={() => methods.trigger()}
                isValid={methods.formState.isValid}
              />
            )}
          </KeyValueTable.Root>
        </form>
      </FormProvider>
      {readOnly && (
        <SectionFormSendTestMessageForm
          replacableText={replacableText}
          onSubmit={({
            userId,
            requestParameter,
            autoFillParameter,
            containsAlimlist,
          }) => {
            mutateSendMessage({
              templateCode: data.templateCode,
              userId,
              requestParameter,
              autoFillParameter,
              containsAlimlist,
            })
          }}
          canContainAlimlist={true}
        />
      )}
    </>
  )
}
