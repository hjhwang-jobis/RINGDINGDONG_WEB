import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import BasicParameterList from '~/basicParameter/components/BasicParameterList'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetParametersBasicsListQuery } from '~/hooks/queries/basicParameter/useGetParametersBasicsListQuery'
import { apiUtils } from '~/utils'

export default function BasicParameterListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    parameter: '',
    title: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    parameter: searchParams.get('parameter'),
    title: searchParams.get('title'),
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetParametersBasicsListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    parameter: params.parameter,
    title: params.title,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        기본 파라미터 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="기본 파라미터 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <BasicParameterList
          data={response.data.contents}
          pagination={{
            pageSize: response.data.pageSize,
            pageNo: response.data.pageNo,
            totalElements: response.data.totalElements,
            totalPage: response.data.totalPage,
          }}
        />
      ) : null}
    </PageContainer>
  )
}
