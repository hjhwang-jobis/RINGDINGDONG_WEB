import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetFriendtalkTemplates, Response } from '~/types/api'

export function useGetFriendtalkTemplatesQuery(
  params: GetFriendtalkTemplates.Request,
  options?: UseQueryOptions<Response<GetFriendtalkTemplates.Response>, ApiError>
) {
  return useQuery<Response<GetFriendtalkTemplates.Response>, ApiError>({
    queryKey: queryKeys.friendtalk.getFriendtalkTemplates(params),
    queryFn: () => services.getFriendtalkTemplates(params),
    ...options,
  })
}
