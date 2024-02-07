import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import KeyValueTable from '~/components/KeyValueTable'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import TableCellTextBlue from '~/components/TableCellTextBlue'
import TableCellTextRed from '~/components/TableCellTextRed'
import {
  ActiveTypeMap,
  MessageChannelType,
  MessageChannelTypeMap,
  MessageGroupSendStatusTypeMap,
  SendProfile,
  SendProfileMap,
} from '~/constants'
import { useGetMessageGroupsQuery } from '~/hooks/queries/messageGroup/useGetMessageGroupsQuery'
import MessageGroupFormMessageGroupTemplateListTable from '~/messageGroup/components/MessageGroupFormMessageGroupTemplateListTable'
import { RoutePath } from '~/routes'
import { apiUtils } from '~/utils'

export default function MessageGroupDetailPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const messageChannelType = searchParams.get(
    'messageChannel'
  ) as MessageChannelType
  const sendProfile = searchParams.get('sendProfile') as SendProfile
  const navigate = useNavigate()
  const {
    data: response,
    isLoading,
    error,
  } = useGetMessageGroupsQuery({
    messageGroupId: Number(id) ?? -1,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        메시지 그룹 상세정보
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="메시지그룹 상세정보 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && messageChannelType ? (
        <>
          <Spacing px={10} />
          <Flex justifyContent="end">
            <Button
              size="small"
              variant="primary"
              onClick={() => {
                navigate(
                  `${RoutePath.MessageGroup}/${RoutePath.EditMessageGroup}/${id}?messageChannel=${messageChannelType}&sendProfile=${sendProfile}`
                )
              }}
              disabled
            >
              메시지그룹 수정하기
            </Button>
          </Flex>
          <Spacing px={10} />
          <Text typography="heading24" weight="bold">
            메시지 그룹 정보
          </Text>
          <KeyValueTable.Root>
            <KeyValueTable.KeyColumn>path</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <Link
                to={`${RoutePath.Action}/${RoutePath.ActionDetail}/${response.data.campaign.action.id}`}
              >
                {response.data.campaign.action.name}
              </Link>
              &nbsp; &gt; &nbsp;
              <Link
                to={`${RoutePath.Campaign}/${RoutePath.CampaignDetail}/${response.data.campaign.id}`}
              >
                {response.data.campaign.name}
              </Link>
              &nbsp; &gt; &nbsp;{response.data.name}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.id}
            </KeyValueTable.ValueColumn>
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
            <KeyValueTable.KeyColumn>발송예정 시각</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.sendingRequestAt}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>생성일자</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.createdAt}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>수정일자</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.updatedAt}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>메시지 그룹 이름</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.name}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>분할 시작 위치</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.partitionFrom}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>분할 종료 위치</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.partitionTo}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>발송 상태</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {MessageGroupSendStatusTypeMap[response.data.sendStatus]}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>활성화 여부</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.isActive ? (
                <TableCellTextBlue
                  text={ActiveTypeMap.ACTIVE}
                  align={'start'}
                />
              ) : (
                <TableCellTextRed
                  text={ActiveTypeMap.DEACTIVE}
                  align={'start'}
                />
              )}
            </KeyValueTable.ValueColumn>
          </KeyValueTable.Root>
          <Spacing px={10} />
          <Text typography="heading24" weight="bold">
            메시지 그룹 템플릿 목록
          </Text>
          <MessageGroupFormMessageGroupTemplateListTable
            data={response.data.messageGroupTemplates ?? []}
            sendProfile={sendProfile}
          />
        </>
      ) : null}
    </PageContainer>
  )
}
