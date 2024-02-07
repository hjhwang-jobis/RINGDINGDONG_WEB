import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetDoneMessageGroupsList, Response } from '~/types/api'

export function useGetDoneMessageGroupsListInfiniteQuery(
  params: GetDoneMessageGroupsList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetDoneMessageGroupsList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<
    Response<GetDoneMessageGroupsList.Response>,
    ApiError
  >(
    queryKeys.messageGroup.getDoneMessageGroupsList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getDoneMessageGroupsList({
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
