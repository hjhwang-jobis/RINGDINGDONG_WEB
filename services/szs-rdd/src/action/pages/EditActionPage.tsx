import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import ActionForm from '~/action/components/ActionForm'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetActionsQuery } from '~/hooks/queries/action/useGetActionsQuery'
import { apiUtils } from '~/utils'

export default function EditActionPage() {
  const { id } = useParams()

  const {
    data: response,
    isLoading,
    error,
  } = useGetActionsQuery({
    actionId: id ? Number(id) : -1,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        캠페인 액션 수정 페이지
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="액션 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <ActionForm data={response.data} />
      ) : null}
    </PageContainer>
  )
}
