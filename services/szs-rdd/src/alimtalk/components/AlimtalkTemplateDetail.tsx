import { Spacing } from '@3o3/mystique-components'
import { ConfirmModal, ErrorModal, useModal } from '@3o3-internal/components'
import React, { Fragment } from 'react'

import {
  StatusTypeMap,
  TemplateEmphasizeTypeMap,
  TemplateMessageTypeMap,
} from '~/alimtalk/constants'
import KeyValueTable from '~/components/KeyValueTable'
import PageContainer from '~/components/PageContainer'
import TableCellTextBlue from '~/components/TableCellTextBlue'
import TableCellTextRed from '~/components/TableCellTextRed'
import Thumbnail, { Size } from '~/components/Thumbnail'
import {
  ActiveTypeMap,
  AlimtalkChannelType,
  AlimtalkChannelTypeToChannelIdMap,
  SendTestMessagePriority,
} from '~/constants'
import { usePostAlimtalkSendMutation } from '~/hooks/queries/alimtalk/usePostAlimtalkSendMutation'
import {
  GetAlimtalkTemplates,
  GetAlimtalkTemplatesMatchedParameters,
} from '~/types/api'

import AlimtalkTemplateDetailSectionFormSendTestMessage from './AlimtalkTemplateDetailSectionFormSendTestMessage'

type AlimtalkTemplate = GetAlimtalkTemplates.AlimtalkTemplate
type AlimtalkMatchedParameterInfo =
  GetAlimtalkTemplatesMatchedParameters.AlimtalkMatchedParameterInfo

interface Props {
  data: AlimtalkTemplate
  dataMatchedParameters?: GetAlimtalkTemplatesMatchedParameters.Response
}

interface AlimtalkButton {
  type: string
  name: string
  linkPc: string
  linkMo: string
  ordering: number
}

const replaceOriginParameterToMatchedParameter = (
  matchedParameters: AlimtalkMatchedParameterInfo[],
  text: string
) =>
  matchedParameters.reduce((acc, v) => {
    return acc.replaceAll(v.originParameter, v.matchedParameter)
  }, text)

const replaceDataWithMatchedParameters = (
  data: AlimtalkTemplate,
  matchedParameters: AlimtalkMatchedParameterInfo[]
) => {
  return {
    ...data,
    content: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      data.content
    ),
    templateExtra: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      data.templateExtra ?? ''
    ),
    templateAd: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      data.templateAd ?? ''
    ),
    templateTitle: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      data.templateTitle ?? ''
    ),
    templateSubtitle: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      data.templateSubtitle ?? ''
    ),
    templateImageName: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      data.templateImageName ?? ''
    ),
  }
}

const replaceButtonsWithMatchedParameters = (
  buttons: AlimtalkButton[],
  matchedParameters: AlimtalkMatchedParameterInfo[]
) => {
  return buttons.map((v) => ({
    ...v,
    name: replaceOriginParameterToMatchedParameter(matchedParameters, v.name),
    linkPc: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      v.linkPc
    ),
    linkMo: replaceOriginParameterToMatchedParameter(
      matchedParameters,
      v.linkMo
    ),
  }))
}

export default function AlimtalkTemplateDetail({
  data,
  dataMatchedParameters,
}: Props) {
  const matchedInfos = dataMatchedParameters
    ? dataMatchedParameters.matchedInfos
    : []
  const dateWithMatchedParameters = replaceDataWithMatchedParameters(
    data,
    matchedInfos
  )

  const buttons: AlimtalkButton[] = replaceButtonsWithMatchedParameters(
    JSON.parse(data.buttons),
    matchedInfos
  )

  const { showModal } = useModal()
  const { mutate } = usePostAlimtalkSendMutation({
    onSuccess: () => {
      showModal(ConfirmModal, {
        title: '메시지 발송 성공',
      })
    },
    onError: (error) => {
      showModal(ErrorModal, {
        title: '알림톡 테스트 발송실패',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  const channelId = data.channelId as AlimtalkChannelType

  return (
    <PageContainer>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>발신 프로필</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {AlimtalkChannelTypeToChannelIdMap[channelId]
            ? AlimtalkChannelTypeToChannelIdMap[channelId]
            : data.channelId}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 코드</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {data.templateCode}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>활성화 상태</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {data.active ? (
            <TableCellTextBlue text={ActiveTypeMap.ACTIVE} align={'start'} />
          ) : (
            <TableCellTextRed text={ActiveTypeMap.DEACTIVE} align={'start'} />
          )}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 이름</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>{data.name}</KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>메시지 유형</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {TemplateMessageTypeMap[data.templateMessageType]
            ? TemplateMessageTypeMap[data.templateMessageType]
            : data.templateMessageType}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 강조 유형</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {TemplateEmphasizeTypeMap[data.templateEmphasizeType]
            ? TemplateEmphasizeTypeMap[data.templateEmphasizeType]
            : data.templateEmphasizeType}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>이미지</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Thumbnail imgUrl={data.templateImageUrl} size={Size.LARGE} />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 내용</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {dateWithMatchedParameters.content}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>부가 정보</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {dateWithMatchedParameters.templateExtra}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>보안 템플릿 여부</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>작업필요!</KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>카테고리</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>작업필요!</KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 버튼</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {buttons.map((button: AlimtalkButton, idx: number) => {
            return (
              <Fragment key={`button-${idx}`}>
                {idx > 0 && <Spacing px={10} />}
                <KeyValueTable.Root>
                  <KeyValueTable.KeyColumn>순서</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {button.ordering}
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>타입</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {button.type}
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>버튼 이름</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {button.name}
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>
                    버튼 링크(모바일)
                  </KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {button.linkPc}
                  </KeyValueTable.ValueColumn>
                  <KeyValueTable.KeyColumn>
                    버튼 링크(PC)
                  </KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {button.linkMo}
                  </KeyValueTable.ValueColumn>
                </KeyValueTable.Root>
              </Fragment>
            )
          })}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 상태</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {StatusTypeMap[data.status]
            ? StatusTypeMap[data.status]
            : data.status}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>생성일자</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {data.createdDateTime}
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
      <AlimtalkTemplateDetailSectionFormSendTestMessage
        matchedInfos={matchedInfos}
        onSubmit={({ userId, requestParameter, autoFillParameter }) => {
          mutate({
            templateCode: data.templateCode,
            userId,
            parameterMap: requestParameter,
            autoFillParameter: autoFillParameter,
            priority: SendTestMessagePriority.FASTEST,
          })
        }}
        disabled={!data.active}
      />
    </PageContainer>
  )
}
