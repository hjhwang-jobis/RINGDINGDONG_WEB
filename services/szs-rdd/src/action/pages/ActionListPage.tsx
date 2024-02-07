import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import ActionList from '~/action/components/ActionList'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetActionsListQuery } from '~/hooks/queries/action/useGetActionsListQuery'
import { apiUtils } from '~/utils'

export default function ActionListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    name: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    name: searchParams.get('name'),
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetActionsListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    name: params.name,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        캠페인 액션 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="캠페인 액션 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <ActionList
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
