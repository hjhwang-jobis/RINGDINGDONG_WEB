import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetTargetQueriresListQuery } from '~/hooks/queries/targetQuery/useGetTargetsQueriesListQuery'
import TargetQueryList from '~/targetQuery/components/TargetQueryList'
import { apiUtils } from '~/utils'

function TargetQueryListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    queryId: '',
    title: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    queryId: searchParams.get('queryId'),
    title: searchParams.get('title'),
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetTargetQueriresListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    queryId: params.queryId,
    title: params.title,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        타겟 쿼리 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 쿼리 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <TargetQueryList
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

export default TargetQueryListPage
