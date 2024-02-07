import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetPushTemplatesList, Response } from '~/types/api'

export function useGetPushTemplatesListInfiniteQuery(
  params: GetPushTemplatesList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetPushTemplatesList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<Response<GetPushTemplatesList.Response>, ApiError>(
    queryKeys.push.getPushTemplatesList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getPushTemplatesList({
        ...params,
        pageNo: pageParam ?? params.pageNo,
      }),
    {
      getNextPageParam: (lastPage) => {
        // TODO InfiniteQuery 로직이 동일하다. 공통함수로 추출하자.
        const hasNext = lastPage.data.pageNo < lastPage.data.totalPage - 1
        const nextPageParam = lastPage.data.pageNo + 1

        return hasNext && nextPageParam
      },
      keepPreviousData: true,
      ...options,
    }
  )
}
