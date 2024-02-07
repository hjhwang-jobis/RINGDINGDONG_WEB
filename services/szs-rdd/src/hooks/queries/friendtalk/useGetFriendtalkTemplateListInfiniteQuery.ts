import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetFriendtalkTemplatesList, Response } from '~/types/api'

export function useGetFriendtalkTemplateListInfiniteQuery(
  params: GetFriendtalkTemplatesList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetFriendtalkTemplatesList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<
    Response<GetFriendtalkTemplatesList.Response>,
    ApiError
  >(
    queryKeys.friendtalk.getFriendtalkTemplatesList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getFriendtalkTemplatesList({
        ...params,
        pageNo: pageParam ?? params.pageNo,
      }),
    {
      getNextPageParam: (lastPage) => {
        const hasNext = lastPage.data.pageNo < lastPage.data.totalPage - 1
        const nextPageParam = lastPage.data.pageNo + 1

        return hasNext && nextPageParam
      },
      keepPreviousData: true,
      ...options,
    }
  )
}
