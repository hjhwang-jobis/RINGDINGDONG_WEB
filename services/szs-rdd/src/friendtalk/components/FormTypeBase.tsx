import { Spacing } from '@3o3/mystique-components'
import {
  ConfirmModal,
  ErrorInfo,
  ErrorModal,
  useModal,
} from '@3o3-internal/components'
import React, { Fragment, useCallback } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
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
import { FormTypeBaseData } from '~/friendtalk/types'
import { FriendtalkButtonBaseType } from '~/friendtalk/types'
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
import FormTypeBasicTextRowFriendtalkButton from './FormTypeBaseRowFriendtalkButton'

interface Props {
  data: FormTypeBaseData
  onChangeTemplateType: (data: FormTypeBaseData) => void
  readOnly?: boolean
}

const concatTexts = (
  description: string,
  comment: string,
  items: FriendtalkButtonBaseType[]
) => {
  const textFromItems = items.reduce((acc, v) => {
    return `${acc}${v.name}`
  }, '')

  return `${description}${comment}${textFromItems}`
}

const sanitizeData = (
  data: FormTypeBaseData
): PostFriendtalkTemplatesBase.Request => {
  return {
    sendProfile: data.sendProfile,
    templateCode: data.templateCode,
    templateType: data.templateType,
    description: data.description,
    requestParameter: data.requestParameter,
    autoFillParameter: data.autoFillParameter,
    item: {
      imageId: data.contentTypeBase.imageId,
      imageLink: data.contentTypeBase.imageLink,
      comment: data.contentTypeBase.comment,
      buttons: data.contentTypeBase.buttons
        .filter((v) => v.isShow)
        .map((v) => sanitizeFriendtalkButton(v)),
    },
    wide: false,
  }
}

export default function FormTypeBasicText({
  data,
  onChangeTemplateType,
  readOnly = false,
}: Props) {
  const replacableText = concatTexts(
    data.description,
    data.contentTypeBase.comment,
    data.contentTypeBase.buttons
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
  const onSubmit = (data: FormTypeBaseData) => mutate(sanitizeData(data))

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
          methods.getValues('contentTypeBase.comment'),
          methods.getValues('contentTypeBase.buttons')
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

  const { fields } = useFieldArray({
    control: methods.control,
    name: 'contentTypeBase.buttons',
  })

  const selectedImageId = methods.watch('contentTypeBase.imageId')

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="친구톡(기본) 생성 오류"
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
                <ImagePreview src={data.contentTypeBase.imageUrl} />
              ) : (
                <FormRowFriendtalkTemplateImageSearch
                  name={formTypeMapNameTree.contentTypeBase.imageId.getName()}
                  templateType={FriendtalkTemplateType.BASE}
                  disabled={readOnly}
                  unselectableImageIds={[`${selectedImageId}`]}
                  imageUrl={data.contentTypeBase.imageUrl ?? ''}
                />
              )}
            </KeyValueTable.ValueColumn>
            {/* REMOVE ME 이미지 링크를 사용하지 않는 것으로 보임. 제거가 필요함. 확인요청 보내놓은 상황(BE 조태호님) */}
            <KeyValueTable.KeyColumn>이미지 링크</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={formTypeMapNameTree.contentTypeBase.imageLink.getName()}
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesFormatUrlOrEmpty(v),
                  ])
                }
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>홍보 문구</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowTextArea
                name={formTypeMapNameTree.contentTypeBase.comment.getName()}
                disabled={readOnly}
                onBlur={updateReplaceableTextVariables}
              />
            </KeyValueTable.ValueColumn>

            {fields.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  <KeyValueTable.KeyColumn>{`버튼${
                    idx + 1
                  }`}</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    <FormTypeBasicTextRowFriendtalkButton
                      idx={idx}
                      hasToggle={idx === 1 && !readOnly}
                      disabled={readOnly}
                      onBlurButtonName={updateReplaceableTextVariables}
                    />
                  </KeyValueTable.ValueColumn>
                </Fragment>
              )
            })}

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
