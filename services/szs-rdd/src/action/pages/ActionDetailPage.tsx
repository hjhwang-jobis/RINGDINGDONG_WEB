import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { Button } from '@fe3o3/ui'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ActionFormRowCampaignListTable from '~/action/components/ActionFormRowCampaignListTable'
import KeyValueTable from '~/components/KeyValueTable'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetActionsQuery } from '~/hooks/queries/action/useGetActionsQuery'
import { RoutePath } from '~/routes'
import { apiUtils } from '~/utils'

export default function ActionDetailPage() {
  const { id } = useParams()
  const actionId = id ? Number(id) : -1
  const navigate = useNavigate()

  const {
    data: response,
    isLoading,
    error,
  } = useGetActionsQuery({
    actionId,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        캠페인 액션 상세 페이지
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="액션 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <>
          <Spacing px={10} />
          <Flex justifyContent="end">
            <Button
              size="small"
              variant="primary"
              style={{
                margin: '10px 0 10px 10px',
              }}
              onClick={() => {
                navigate(`${RoutePath.Action}/${RoutePath.EditAction}/${id}`)
              }}
            >
              액션 수정하기
            </Button>
          </Flex>
          <KeyValueTable.Root>
            <KeyValueTable.KeyColumn>액션 이름</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.name}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>액션 설명</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {response.data.description ?? ''}
            </KeyValueTable.ValueColumn>
          </KeyValueTable.Root>
          <Spacing px={10} />
          <ActionFormRowCampaignListTable
            data={response.data.campaigns}
            actionId={actionId}
          />
        </>
      ) : null}
    </PageContainer>
  )
}
