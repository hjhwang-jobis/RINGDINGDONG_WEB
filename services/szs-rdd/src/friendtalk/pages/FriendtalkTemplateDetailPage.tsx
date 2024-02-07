import { Spacing, Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { PageMode } from '~/constants'
import FriendtalkForm from '~/friendtalk/components/FriendtalkForm'
import { useGetFriendtalkTemplatesQuery } from '~/hooks/queries/friendtalk/useGetFriendtalkTemplatesQuery'
import { apiUtils } from '~/utils'

export default function FriendtalkTemplateDetailPage() {
  const { templateCode } = useParams()

  const {
    data: response,
    isLoading,
    error,
  } = useGetFriendtalkTemplatesQuery({
    templateCode: templateCode ?? '',
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        친구톡 템플릿 상세
      </Text>
      <Spacing px={10} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="친구톡 상세 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <FriendtalkForm
          friendtalkResponse={response}
          pageMode={PageMode.READ_ONLY}
        />
      ) : null}
    </PageContainer>
  )
}
