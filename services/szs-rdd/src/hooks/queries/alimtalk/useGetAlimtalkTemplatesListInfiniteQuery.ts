import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkTemplatesList, Response } from '~/types/api'

export function useGetAlimtalkTemplatesListInfiniteQuery(
  params: GetAlimtalkTemplatesList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetAlimtalkTemplatesList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<
    Response<GetAlimtalkTemplatesList.Response>,
    ApiError
  >(
    queryKeys.alimtalk.getAlimtalkTemplatesList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getAlimtalkTemplatesList({
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
