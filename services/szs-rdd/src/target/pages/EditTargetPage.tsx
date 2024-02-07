import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetTargetsQuery } from '~/hooks/queries/target/useGetTargetsQuery'
import TargetForm from '~/target/components/TargetForm'
import { apiUtils } from '~/utils'

export default function EditTargetPage() {
  const { id } = useParams()

  const {
    data: response,
    isLoading,
    error,
  } = useGetTargetsQuery({
    targetId: Number(id),
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        타겟 수정
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 상세 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <TargetForm
          data={{
            ...response.data,
            targetQueries: [
              ...response.data.excludeTargetQueries.map((v) => ({
                ...v,
                isIncluded: false,
              })),
              ...response.data.includeTargetQueries.map((v) => ({
                ...v,
                isIncluded: true,
              })),
            ],
            doneMessages: [
              ...response.data.excludeMessageGroups.map((v) => ({
                ...v,
                isIncluded: false,
              })),
              ...response.data.includeMessageGroups.map((v) => ({
                ...v,
                isIncluded: true,
              })),
            ],
          }}
        />
      ) : null}
    </PageContainer>
  )
}
