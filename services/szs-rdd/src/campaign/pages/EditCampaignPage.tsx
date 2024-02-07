import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import CampaignForm from '~/campaign/components/CampaignForm'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetCampaignsQuery } from '~/hooks/queries/campaign/useGetCampaignsQuery'
import { apiUtils } from '~/utils'

export default function EditCampaignPage() {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    error,
  } = useGetCampaignsQuery({
    campaignId: Number(id) ?? -1,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        캠페인 수정하기
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="캠페인 상세정보 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <CampaignForm data={response.data} />
      ) : null}
    </PageContainer>
  )
}
