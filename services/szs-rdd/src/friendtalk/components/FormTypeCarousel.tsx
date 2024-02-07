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
import FormRowRadioFriendtalkTemplateType from '~/components/FormRowRadioFriendtalkTemplateType'
import FormRowSelectSendProfile from '~/components/FormRowSelectSendProfile'
import FormRowTextTemplateCode from '~/components/FormRowTextTemplateCode'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import SectionFormSendTestMessageForm from '~/components/SectionFormSendTestMessage'
import {
  ContentTypeCarouselItem,
  FormTypeCarouselData,
} from '~/friendtalk/types'
import { formTypeMapNameTree } from '~/friendtalk/utils'
import { sanitizeContentTypeCarouselItem } from '~/friendtalk/utils'
import { usePostFriendtalkSendMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkSendMutation'
import { usePostFriendtalkTemplatesCarouselMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkTemplatesCarouselMutation'
import { RoutePath } from '~/routes'
import { ParameterField, ParameterMap } from '~/types'
import { PostFriendtalkTemplatesCarousel } from '~/types/api'
import { apiUtils } from '~/utils'
import {
  autoFillParameterUtils,
  parameterUtils,
  requestParameterUtils,
} from '~/utils'

import FormRowTextMessageName from './FormRowTextMessageName'
import FormTypeCarouselRowItemList from './FormTypeCarouselRowItemList'
import FormTypeCarouselRowTail from './FormTypeCarouselRowTail'

interface Props {
  data: FormTypeCarouselData
  onChangeTemplateType: (data: FormTypeCarouselData) => void
  readOnly?: boolean
}

const concatTexts = (description: string, items: ContentTypeCarouselItem[]) => {
  const textFromItems = items.reduce((acc, v) => {
    return `${acc}${v.header}${v.message}${v.buttons[0].name}`
  }, '')

  return `${description}${textFromItems}`
}

type FormRawDataType = FormTypeCarouselData & {
  autoFillParameterFieldList: ParameterField[]
}

const sanitizeData = (
  data: FormRawDataType
): PostFriendtalkTemplatesCarousel.Request => ({
  sendProfile: data.sendProfile,
  templateCode: data.templateCode,
  description: data.description,
  requestParameter: data.requestParameter,
  autoFillParameter: autoFillParameterUtils.convertToAutoFillParameter(
    data.autoFillParameterFieldList
  ),
  items: data.contentTypeCarousel.items.map((v) =>
    sanitizeContentTypeCarouselItem(v)
  ),
  carouselTail: data.contentTypeCarousel.carouselTail,
})

export default function FormTypeCarousel({
  data,
  onChangeTemplateType,
  readOnly = false,
}: Props) {
  const replacableText = concatTexts(
    data.description,
    data.contentTypeCarousel.items
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
  const { mutate, error } = usePostFriendtalkTemplatesCarouselMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateList}`
      ),
  })
  const onSubmit = (data: FormRawDataType) => mutate(sanitizeData(data))

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
          methods.getValues('contentTypeCarousel.items')
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

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="친구톡(캐러셀) 생성 오류"
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
            <KeyValueTable.KeyColumn>캐러셀 리스트</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormTypeCarouselRowItemList disabled={readOnly} />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>캐러셀 Tail</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormTypeCarouselRowTail disabled={readOnly} />
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
