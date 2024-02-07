import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetFriendtalkTemplatesImagesList, Response } from '~/types/api'

export function useGetFriendtalkTemplateImagesListQuery(
  params: GetFriendtalkTemplatesImagesList.Request,
  options?: UseQueryOptions<
    Response<GetFriendtalkTemplatesImagesList.Response>,
    ApiError
  >
) {
  return useQuery<
    Response<GetFriendtalkTemplatesImagesList.Response>,
    ApiError
  >({
    queryKey: queryKeys.friendtalkImage.getFriendtalkTemplateImagesList(params),
    queryFn: () => services.getFriendtalkTemplateImagesList(params),
    ...options,
  })
}
