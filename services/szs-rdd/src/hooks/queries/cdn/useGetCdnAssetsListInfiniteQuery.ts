import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetCdnAssetsList, Response } from '~/types/api'

export function useGetCdnAssetsListInfiniteQuery(
  params: GetCdnAssetsList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetCdnAssetsList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<Response<GetCdnAssetsList.Response>, ApiError>(
    queryKeys.cdn.getCdnAssetsList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getCdnAssetsList({
        ...params,
        pageNo: pageParam ?? params.pageNo,
      }),
    {
      getNextPageParam: (lastPage) => {
        const hasNext = lastPage.data.pageNo < lastPage.data.totalPage - 1

        return hasNext ? lastPage.data.pageNo + 1 : undefined
      },
      keepPreviousData: true,
      ...options,
    }
  )
}
