import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useParams } from 'react-router-dom'

import BasicParameterForm from '~/basicParameter/components/BasicParameterForm'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { useGetParametersBasicsOneQuery } from '~/hooks/queries/basicParameter/useGetParametersBasicsQuery'
import { apiUtils } from '~/utils'

export default function EditBasicParameterPage() {
  const { id } = useParams()

  const {
    data: response,
    isLoading,
    error,
  } = useGetParametersBasicsOneQuery({
    parameterId: id ? Number(id) : -1,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        기본 파라미터 수정
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="기본 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <BasicParameterForm data={response.data} />
      ) : null}
    </PageContainer>
  )
}
