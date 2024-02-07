import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimlistTemplatesList, Response } from '~/types/api'

export function useGetAlimlistTemplatesListInfiniteQuery(
  params: GetAlimlistTemplatesList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetAlimlistTemplatesList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<
    Response<GetAlimlistTemplatesList.Response>,
    ApiError
  >(
    queryKeys.alimlist.getAlimlistTemplatesList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getAlimlistTemplatesList({
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
