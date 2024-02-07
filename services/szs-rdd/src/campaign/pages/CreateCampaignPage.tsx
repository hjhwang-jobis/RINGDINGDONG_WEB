import { Text } from '@3o3/mystique-components'
import React from 'react'
import { useParams } from 'react-router-dom'

import CampaignForm from '~/campaign/components/CampaignForm'
import PageContainer from '~/components/PageContainer'

export default function CreateCampaignPage() {
  const { actionId } = useParams()

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        캠페인 생성
      </Text>
      <CampaignForm actionId={Number(actionId)} />
    </PageContainer>
  )
}
