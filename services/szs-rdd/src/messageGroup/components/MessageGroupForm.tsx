import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { useModal } from '@3o3-internal/components'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import React, { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import FormRowDateTimeInput from '~/components/FormRowDateTimeInput'
import FormRowTextWarning from '~/components/FormRowTextWarning'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import TableCellTextBlue from '~/components/TableCellTextBlue'
import TableCellTextRed from '~/components/TableCellTextRed'
import {
  ActiveTypeMap,
  MESSAGE_GROUP_PARTITION_FROM_MIN,
  MESSAGE_GROUP_PARTITION_TO_MAX,
  MessageChannelType,
  MessageChannelTypeMap,
  MessageGroupSendStatusType,
  MessageGroupSendStatusTypeMap,
  SendProfile,
  SendProfileMap,
  SendProfileToAlimtalkChannelTypeMap,
} from '~/constants'
import {
  FormData,
  FormMessageGroupTemplate,
  SelectedMessageGroupTemplate,
} from '~/messageGroup/types'
import { MessageGroup, Parameter } from '~/types'
import { dateTimeUtils, parameterUtils } from '~/utils'

import MessageGroupFormMessageGroupTemplateListTable from './MessageGroupFormMessageGroupTemplateListTable'
import MessageGroupFormModalAlimlistList from './MessageGroupFormModalAlimlistList'
import MessageGroupFormModalAlimtalkList from './MessageGroupFormModalAlimtalkList'
import MessageGroupFormModalFriendtalkList from './MessageGroupFormModalFriendtalkList'
import MessageGroupFormModalPushList from './MessageGroupFormModalPushList'
import MessageGroupFormRowAlimtalkParameterList from './MessageGroupFormRowAlimtalkParameterList'
import MessageGroupFormRowParameterList from './MessageGroupFormRowParameterList'

interface Props {
  messageChannelType: MessageChannelType
  sendProfile: SendProfile
  data: MessageGroup
  autoParameters: Parameter[]
  personalParameters: Parameter[]
  onSubmit: (data: FormData) => void
}

// NOTE: 최대 노출 가능한 메시지 그룹 템플릿 갯수
const MAX_TEMPLATE_CNT = 5

export default function MessageGroupForm({
  data,
  messageChannelType,
  sendProfile,
  autoParameters,
  personalParameters,
  onSubmit,
}: Props) {
  const alimtalkChannelType = SendProfileToAlimtalkChannelTypeMap[sendProfile]
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      id: data?.id ?? -1,
      createdAt: data?.createdAt ?? '',
      updatedAt: data?.updatedAt ?? '',
      name: data?.name ?? '',
      partitionFrom: data?.partitionFrom ?? MESSAGE_GROUP_PARTITION_FROM_MIN,
      partitionTo: data?.partitionTo ?? MESSAGE_GROUP_PARTITION_TO_MAX,
      sendStatus: data?.sendStatus ?? MessageGroupSendStatusType.WAITING,
      isActive: data?.isActive ?? false,
      sendingRequestAt: data?.sendingRequestAt
        ? dateTimeUtils.toYYYYMMDDHHmm(data.sendingRequestAt)
        : '',
      messageGroupTemplates: data?.messageGroupTemplates ?? [],
      formMessageGroupTemplates: [],
    },
  })

  // NOTE: 일반 파라미터가 아닌 개인정보, 자동계산 파라미터를 확인할 수 있는 맵
  const excludingParameterMap = useMemo<Set<string>>(() => {
    return [...autoParameters, ...personalParameters].reduce(
      (acc, parameter) => {
        acc.add(parameter.parameter)

        return acc
      },
      new Set<string>()
    )
  }, [autoParameters, personalParameters])

  const messageGroupTemplates = methods.watch('messageGroupTemplates')
  const { showModal } = useModal()
  const onSubmitTemplateCodes = useCallback(
    (templates: SelectedMessageGroupTemplate[]) => {
      const formMessageGroupTemplates: FormMessageGroupTemplate[] =
        templates.map((item) => {
          const basicParameterRows = parameterUtils
            .findReplaceableTextVariableList(item.text)
            .map((v) => ({
              key: v,
              value: '',
            }))
            .filter((parameter) => !excludingParameterMap.has(parameter.key))

          return {
            templateCode: item.templateCode,
            parameterRows: basicParameterRows,
            isContainAlimlist: false,
          }
        })
      methods.setValue('formMessageGroupTemplates', formMessageGroupTemplates)
    },
    [methods, excludingParameterMap]
  )

  const [alimtalkTemplates, setAlimtalkTemplates] = useState<
    SelectedMessageGroupTemplate[]
  >([])

  const onSubmitAlimtalkTemplateCodes = useCallback(
    (templates: SelectedMessageGroupTemplate[]) => {
      setAlimtalkTemplates(templates)
    },
    []
  )
  const onClick = useCallback(() => {
    switch (messageChannelType) {
      case MessageChannelType.ALIMLIST:
        showModal(MessageGroupFormModalAlimlistList, {
          callback: onSubmitTemplateCodes,
        })
        break
      case MessageChannelType.ALIMTALK:
        showModal(MessageGroupFormModalAlimtalkList, {
          callback: onSubmitAlimtalkTemplateCodes,
          alimtalkChannelType,
        })
        break
      case MessageChannelType.PUSH:
        showModal(MessageGroupFormModalPushList, {
          callback: onSubmitTemplateCodes,
        })
        break
      case MessageChannelType.FRIENDTALK:
        showModal(MessageGroupFormModalFriendtalkList, {
          callback: onSubmitTemplateCodes,
        })
        break
    }
  }, [
    messageChannelType,
    alimtalkChannelType,
    showModal,
    onSubmitTemplateCodes,
    onSubmitAlimtalkTemplateCodes,
  ])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>{data.id}</KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>메시지 채널 타입</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {MessageChannelTypeMap[messageChannelType]}
          </KeyValueTable.ValueColumn>
          {messageChannelType === MessageChannelType.ALIMTALK && (
            <>
              <KeyValueTable.KeyColumn>프로필</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                {SendProfileMap[sendProfile]}
              </KeyValueTable.ValueColumn>
            </>
          )}
          <KeyValueTable.KeyColumn>생성일자</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {data.createdAt}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>수정일자</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {data.updatedAt}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>메시지 그룹 이름</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>{data.name}</KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>분할 시작 위치</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {data.partitionFrom}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>분할 종료 위치</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {data.partitionTo}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>발송 상태</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {MessageGroupSendStatusTypeMap[data.sendStatus]}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>활성화 여부</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {data.isActive ? (
              <TableCellTextBlue text={ActiveTypeMap.ACTIVE} align={'start'} />
            ) : (
              <TableCellTextRed text={ActiveTypeMap.DEACTIVE} align={'start'} />
            )}
          </KeyValueTable.ValueColumn>
          {/* NOTE: 최소 현재 대비 3시간 이후 시간을 입력해 주세요. */}
          <KeyValueTable.KeyColumn>발송요청일시</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowDateTimeInput name={'sendingRequestAt'} />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>
            새로운 메시지그룹 템플릿 목록
          </KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowTextWarning
              text={
                '"새로운 메시지그룹 템플릿 목록"을 추가한 뒤, 저장하면 "등록된 메시지그룹 템플릿 목록"은 삭제됩니다.'
              }
            />
            <Spacing px={10} />
            <Flex justifyContent="start">
              <Button
                size="small"
                variant="lineBlue"
                type="button"
                onClick={onClick}
                css={css`
                  margin-right: 10px;
                `}
                disabled={
                  messageGroupTemplates
                    ? messageGroupTemplates.length >= MAX_TEMPLATE_CNT
                    : false
                }
              >
                메시지그룹 템플릿 선택하기
              </Button>
            </Flex>
            <Spacing px={10} />
            {messageChannelType === MessageChannelType.ALIMTALK &&
            alimtalkTemplates.length > 0 ? (
              <MessageGroupFormRowAlimtalkParameterList
                messageGroupTemplates={alimtalkTemplates}
                alimtalkChannelType={alimtalkChannelType}
                messageChannelType={messageChannelType}
              />
            ) : messageChannelType === MessageChannelType.ALIMTALK &&
              alimtalkTemplates.length === 0 ? (
              <Flex
                justifyContent="center"
                css={css`
                  padding: 10px;
                `}
              >
                <Text
                  typography="body14"
                  weight="medium"
                  color={colors.light.scheme.$gray40}
                >
                  선택된 메시지그룹 알림톡 템플릿이 없습니다.
                </Text>
              </Flex>
            ) : (
              <MessageGroupFormRowParameterList
                messageChannelType={messageChannelType}
              />
            )}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>
            등록된 메시지그룹 템플릿 목록
          </KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {messageGroupTemplates?.length === 0 ? (
              <FormRowTextWarning
                text={'등록된 메시지그룹 템플릿이 없습니다.'}
              />
            ) : (
              <MessageGroupFormMessageGroupTemplateListTable
                data={messageGroupTemplates ?? []}
                sendProfile={sendProfile}
              />
            )}
          </KeyValueTable.ValueColumn>
          <FormRowValidateNSubmit
            onValidate={() => methods.trigger()}
            isValid={methods.formState.isValid}
          />
        </KeyValueTable.Root>
      </form>
    </FormProvider>
  )
}
