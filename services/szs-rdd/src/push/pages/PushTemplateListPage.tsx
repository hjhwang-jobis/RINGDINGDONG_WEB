import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import { useGetPushTemplatesListQuery } from '~/hooks/queries/push/useGetPushTemplatesListQuery'
import PushTemplateList from '~/push/components/PushTemplateList'
import { apiUtils } from '~/utils'

export default function PushTemplateListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    direction: SortDirection.DESC,
    templateCode: '',
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    direction: searchParams.get('direction') as SortDirection,
    templateCode: searchParams.get('templateCode'),
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetPushTemplatesListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    direction: params.direction,
    templateCode: params.templateCode ?? null,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        앱 푸시 템플릿 목록
      </Text>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : (
        <>
          {response && (
            <PushTemplateList
              data={response.data.contents}
              pagination={{
                pageSize: response.data.pageSize,
                pageNo: response.data.pageNo,
                totalElements: response.data.totalElements,
                totalPage: response.data.totalPage,
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  )
}
