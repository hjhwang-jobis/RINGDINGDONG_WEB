import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import CampaignMessageGroupListTable from '~/campaign/components/CampaignMessageGroupListTable'
import KeyValueTable from '~/components/KeyValueTable'
import { MessageChannelTypeMap, SendProfileMap } from '~/constants'
import { RoutePath } from '~/routes'
import { Campaign } from '~/types'

interface Props {
  data: Campaign
}

export default function CampaignDetail({ data }: Props) {
  const navigate = useNavigate()

  const hasActivatedMessageGroup = data.messageGroups.some((v) => v.isActive)

  return (
    <>
      <Flex justifyContent="end">
        <Button
          size="small"
          variant="primary"
          style={{
            margin: '10px 0 10px 10px',
          }}
          disabled={hasActivatedMessageGroup}
          onClick={() => {
            navigate(
              `${RoutePath.Campaign}/${RoutePath.EditCampaign}/${data.id}`
            )
          }}
        >
          캠페인 수정하기
        </Button>
      </Flex>
      <Spacing px={10} />
      <Text typography="heading24" weight="bold">
        캠페인 정보
      </Text>
      <Spacing px={10} />
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>path</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Link
            to={`${RoutePath.Action}/${RoutePath.ActionDetail}/${data.action.id}`}
          >
            {data.action.name}
          </Link>
          &nbsp; &gt; &nbsp;{data.name}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>{data.id}</KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>작성자</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {data.author.name}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>생성일시</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>{data.createdAt}</KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>캠페인 이름</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>{data.name}</KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>발송채널</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {MessageChannelTypeMap[data.messageChannel]}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>발신프로필</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {SendProfileMap[data.sendProfile]}
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>타겟 아이디</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Link
            to={`${RoutePath.Target}/${RoutePath.EditTarget}/${data.target.id}`}
          >
            {data.target.targetId}
          </Link>
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>타겟명</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          {data.target.title}
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
      <Spacing px={10} />
      <Text typography="heading24" weight="bold">
        메시지 그룹 목록
      </Text>
      <Spacing px={10} />
      <CampaignMessageGroupListTable
        data={data.messageGroups}
        messageChannel={data.messageChannel}
        campaignId={data.id}
        sendProfile={data.sendProfile}
      />
    </>
  )
}
