import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetMessageGroups, Response } from '~/types/api'

export function useGetMessageGroupsQuery(
  params: GetMessageGroups.Request,
  options?: UseQueryOptions<Response<GetMessageGroups.Response>, ApiError>
) {
  return useQuery<Response<GetMessageGroups.Response>, ApiError>({
    queryKey: queryKeys.messageGroup.getMessageGroups(params),
    queryFn: () => services.getMessageGroups(params),
    ...options,
  })
}
