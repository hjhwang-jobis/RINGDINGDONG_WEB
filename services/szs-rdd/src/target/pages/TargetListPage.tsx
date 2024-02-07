import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetTargetsListQuery } from '~/hooks/queries/target/useGetTargetsListQuery'
import TargetList from '~/target/components/TargetList'
import { apiUtils } from '~/utils'

function TargetListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    targetId: '',
    title: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    targetId: searchParams.get('targetId'),
    title: searchParams.get('title'),
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetTargetsListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    targetId: params.targetId,
    title: params.title,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        타겟 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <TargetList
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

export default TargetListPage
