import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import AlimtalkTemplateList from '~/alimtalk/components/AlimtalkTemplateList'
import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import {
  AlimtalkChannelType,
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  SendProfile,
  SortDirection,
} from '~/constants'
import { useGetAlimtalkTemplatesListQuery } from '~/hooks/queries/alimtalk/useGetAlimtalkTemplatesListQuery'
import { apiUtils } from '~/utils'

export default function AlimtalkTemplateListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    direction: SortDirection.DESC,
    templateCode: '',
    profile: AlimtalkChannelType.SZS,
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    direction: searchParams.get('direction') as SortDirection,
    templateCode: searchParams.get('templateCode'),
    profile: searchParams.get('profile'),
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetAlimtalkTemplatesListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    direction: params.direction,
    templateCode: params.templateCode ? params.templateCode : null,
    profile: params.profile ? (params.profile as SendProfile) : null,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        알림톡 템플릿 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="알림톡 템플릿 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <AlimtalkTemplateList
          data={response.data.contents}
          pagination={{
            pageSize: response.data.pageSize,
            pageNo: response.data.pageNo,
            totalElements: response.data.totalElements,
            totalPage: response.data.totalPage,
          }}
          profile={searchParams.get('profile')!}
        />
      ) : null}
    </PageContainer>
  )
}
