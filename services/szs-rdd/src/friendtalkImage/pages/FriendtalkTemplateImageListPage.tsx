import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import FriendtalkTemplateImageList from '~/friendtalkImage/components/FriendtalkTemplateImageList'
import { useGetFriendtalkTemplateImagesListQuery } from '~/hooks/queries/friendtalk/useGetFriendtalkTemplateImagesListQuery'
import { apiUtils } from '~/utils'

export default function FriendtalkTemplateImageListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    direction: SortDirection.DESC,
  })

  const params = {
    pageSize: Number(searchParams.get('size')),
    pageNo: Number(searchParams.get('page')) - 1,
    direction: searchParams.get('direction') as SortDirection,
  }

  const {
    data: response,
    isLoading,
    error,
  } = useGetFriendtalkTemplateImagesListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    direction: params.direction,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        친구톡 템플릿 이미지 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="친구톡 템플릿 이미지 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <FriendtalkTemplateImageList
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
