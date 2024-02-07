import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetTargetsQueriesOneQuery } from '~/hooks/queries/targetQuery/useGetTargetsQueriesQuery'
import TargetQueryForm from '~/targetQuery/components/TargetQueryForm'
import { apiUtils } from '~/utils'

export default function EditTargetQueryPage() {
  const { id } = useParams()

  const {
    data: response,
    isLoading,
    error,
  } = useGetTargetsQueriesOneQuery({
    targetQueryId: id ?? '',
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        타겟 쿼리 수정
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 상세 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <TargetQueryForm data={response.data} />
      ) : null}
    </PageContainer>
  )
}
