import { Text } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import { useSearchParams } from 'react-router-dom'

import Loader from '~/components/Loader'
import PageContainer from '~/components/PageContainer'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, SortDirection } from '~/constants'
import FriendtalkTemplateList from '~/friendtalk/components/FriendtalkTemplateList'
import { useGetFriendtalkTemplatesListQuery } from '~/hooks/queries/friendtalk/useGetFriendtalkTemplatesListQuery'
import { apiUtils } from '~/utils'

export default function FriendtalkTemplateListPage() {
  const [searchParams] = useSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    page: `${DEFAULT_PAGE_NO}`,
    direction: SortDirection.DESC,
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
  } = useGetFriendtalkTemplatesListQuery({
    pageSize: params.pageSize,
    pageNo: params.pageNo,
    direction: params.direction,
    templateCode: params.templateCode,
  })

  return (
    <PageContainer>
      <Text typography="heading40" weight="bold">
        친구톡 템플릿 목록
      </Text>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="친구톡 템플릿 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data?.contents ? (
        <FriendtalkTemplateList
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
