import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetTestersQuery } from '~/hooks/queries/tester/useGetTestersQuery'
import TesterForm from '~/tester/components/TesterForm'
import { apiUtils } from '~/utils'

export default function EditTesterPage() {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    error,
  } = useGetTestersQuery({
    testerId: Number(id) ?? -1,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        테스터 수정하기
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="친구톡 템플릿 상세정보 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <TesterForm data={response.data} />
      ) : null}
    </PageContainer>
  )
}
