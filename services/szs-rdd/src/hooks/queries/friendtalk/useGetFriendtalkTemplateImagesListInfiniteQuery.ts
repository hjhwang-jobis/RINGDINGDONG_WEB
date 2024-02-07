import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetFriendtalkTemplatesImagesList, Response } from '~/types/api'

export function useGetFriendtalkTemplateImagesListInfiniteQuery(
  params: GetFriendtalkTemplatesImagesList.Request,
  options?: UseInfiniteQueryOptions<
    Response<GetFriendtalkTemplatesImagesList.Response>,
    ApiError
  >
) {
  return useInfiniteQuery<
    Response<GetFriendtalkTemplatesImagesList.Response>,
    ApiError
  >(
    queryKeys.friendtalkImage.getFriendtalkTemplateImagesList(params),
    ({ pageParam }: QueryFunctionContext<QueryKey, number>) =>
      services.getFriendtalkTemplateImagesList({
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
