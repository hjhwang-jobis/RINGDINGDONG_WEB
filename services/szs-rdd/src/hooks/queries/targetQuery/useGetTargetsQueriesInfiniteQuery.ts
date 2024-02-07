import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTargetsQueriesList, Response } from '~/types/api'

export function useGetTargetsQueriesInfiniteQuery(
  params: GetTargetsQueriesList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetTargetsQueriesList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<Response<GetTargetsQueriesList.Response>, ApiError>(
    queryKeys.targetQuery.getTargetsQueriesList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getTargetsQueriesList({
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
