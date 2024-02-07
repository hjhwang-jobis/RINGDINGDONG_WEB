import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTargetsList, Response } from '~/types/api'

export function useGetTargetsListInfiniteQuery(
  params: GetTargetsList.Request,
  options?: UseInfiniteQueryOptions<Response<GetTargetsList.Response>, ApiError>
) {
  return useInfiniteQuery<Response<GetTargetsList.Response>, ApiError>(
    queryKeys.target.getTargetsList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getTargetsList({
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
