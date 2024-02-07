import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetFriendtalkTemplatesList, Response } from '~/types/api'

export function useGetFriendtalkTemplatesListQuery(
  params: GetFriendtalkTemplatesList.Request,
  options?: UseQueryOptions<
    Response<GetFriendtalkTemplatesList.Response>,
    ApiError
  >
) {
  return useQuery<Response<GetFriendtalkTemplatesList.Response>, ApiError>({
    queryKey: queryKeys.friendtalk.getFriendtalkTemplatesList(params),
    queryFn: () => services.getFriendtalkTemplatesList(params),
    ...options,
  })
}
