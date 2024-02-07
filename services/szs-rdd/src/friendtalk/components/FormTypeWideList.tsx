import { Flex, Spacing } from '@3o3/mystique-components'
import {
  ConfirmModal,
  ErrorInfo,
  ErrorModal,
  useModal,
} from '@3o3-internal/components'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import React, { Fragment, useCallback } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowAutoFillParameters from '~/components/FormRowAutoFillParameters'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowRadioFriendtalkTemplateType from '~/components/FormRowRadioFriendtalkTemplateType'
import FormRowSelectSendProfile from '~/components/FormRowSelectSendProfile'
import FormRowTextTemplateCode from '~/components/FormRowTextTemplateCode'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import SectionFormSendTestMessageForm from '~/components/SectionFormSendTestMessage'
import {
  ContentTypeWideListItem,
  FormTypeWideListData,
  FriendtalkButton,
} from '~/friendtalk/types'
import {
  formTypeMapNameTree,
  getEmptyWideListItem,
  sanitizeFriendtalkButton,
  sanitizeWideListItem,
} from '~/friendtalk/utils'
import { usePostFriendtalkSendMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkSendMutation'
import { usePostFriendtalkTemplatesWidelistMutation } from '~/hooks/queries/friendtalk/usePostFriendtalkTemplatesWidelistMutation'
import { RoutePath } from '~/routes'
import { ParameterField, ParameterMap } from '~/types'
import { PostFriendtalkTemplatesWidelist } from '~/types/api'
import { apiUtils } from '~/utils'
import {
  autoFillParameterUtils,
  parameterUtils,
  requestParameterUtils,
  validators,
} from '~/utils'

import FormRowTextMessageName from './FormRowTextMessageName'
import FormTypeWideListRowFriendtalkButton from './FormTypeWideListRowFriendtalkButton'
import FormTypeWideListRowItem from './FormTypeWideListRowItem'

interface Props {
  data: FormTypeWideListData
  onChangeTemplateType: (v: FormTypeWideListData) => void
  readOnly?: boolean
}

const concatTexts = (
  description: string,
  header: string,
  items: ContentTypeWideListItem[],
  buttons: FriendtalkButton[]
) => {
  const textFromItems = items.reduce((acc, v) => {
    return `${acc}${v.title}`
  }, '')

  const textFromButtons = buttons.reduce((acc, v) => {
    return `${acc}${v.name}`
  }, '')

  return `${description}${header}${textFromItems}${textFromButtons}`
}

const sanitizeData = (
  data: FormTypeWideListData
): PostFriendtalkTemplatesWidelist.Request => ({
  sendProfile: data.sendProfile,
  templateCode: data.templateCode,
  templateType: data.templateType,
  description: data.description,
  requestParameter: data.requestParameter,
  autoFillParameter: data.autoFillParameter,
  item: {
    header: data.contentTypeWideList.header,
    wideListItemRequests: data.contentTypeWideList.items.map((v) =>
      sanitizeWideListItem(v)
    ),
    buttons: data.contentTypeWideList.buttons.map((v) =>
      sanitizeFriendtalkButton(v)
    ),
  },
})

const MIN_ITEM_CNT = 3
const MAX_ITEM_CNT = 4

export default function FormTypeWideList({
  data,
  onChangeTemplateType,
  readOnly = false,
}: Props) {
  const replacableText = concatTexts(
    data.description,
    data.contentTypeWideList.header,
    data.contentTypeWideList.items,
    data.contentTypeWideList.buttons
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

  const nameItems = formTypeMapNameTree.contentTypeWideList.items.getName()
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: nameItems,
  })

  const navigate = useNavigate()
  const { mutate, error } = usePostFriendtalkTemplatesWidelistMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.FriendtalkTemplate}/${RoutePath.FriendtalkTemplateList}`
      ),
  })
  const onSubmit = (data: FormTypeWideListData) => mutate(sanitizeData(data))

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
          methods.getValues('contentTypeWideList.header'),
          methods.getValues('contentTypeWideList.items'),
          methods.getValues('contentTypeWideList.buttons')
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
  const items: ContentTypeWideListItem[] = methods.watch(nameItems)
  const imageIds = items.filter((v) => v.imageId > 0).map((v) => v.imageId)

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="친구톡(와이드 리스트) 생성 오류"
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
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>타이틀</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={formTypeMapNameTree.contentTypeWideList.header.getName()}
                placeholder="타이틀을 입력해주세요"
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(v, 5, 20),
                  ])
                }
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            {fields.map((item, idx) => {
              const columnNames = [
                '리스트 1(필수)',
                '리스트 2(필수)',
                '리스트 3(필수)',
                '리스트 4(선택)',
              ]

              return (
                <Fragment key={`carousel-list-${idx}`}>
                  <KeyValueTable.KeyColumn>
                    {columnNames[idx]}
                  </KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    <FormTypeWideListRowItem
                      idx={idx}
                      imageIds={imageIds}
                      disabled={readOnly}
                    />
                  </KeyValueTable.ValueColumn>
                </Fragment>
              )
            })}
            {/* TODO 선택적으로 내려오는 네번째 아이템에 대한 처리가 필요하다 */}
            {!readOnly && (
              <>
                <KeyValueTable.KeyColumn>
                  아이템 추가/제거
                </KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  <Flex justifyContent="start">
                    <Button
                      variant="lineBlue"
                      size="small"
                      css={css`
                        margin-right: 10px;
                      `}
                      disabled={fields.length === MAX_ITEM_CNT || readOnly}
                      onClick={() => append(getEmptyWideListItem())}
                    >
                      추가
                    </Button>
                    <Button
                      variant="lineRed"
                      size="small"
                      disabled={fields.length === MIN_ITEM_CNT || readOnly}
                      onClick={() => remove(fields.length - 1)}
                    >
                      삭제
                    </Button>
                  </Flex>
                </KeyValueTable.ValueColumn>
              </>
            )}
            <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormTypeWideListRowFriendtalkButton
                idx={0}
                disabled={readOnly}
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
