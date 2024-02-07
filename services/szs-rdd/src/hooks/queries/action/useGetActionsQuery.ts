import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetActions, Response } from '~/types/api'

export function useGetActionsQuery(
  params: GetActions.Request,
  options?: UseQueryOptions<Response<GetActions.Response>, ApiError>
) {
  return useQuery<Response<GetActions.Response>, ApiError>({
    queryKey: queryKeys.action.getActions(params),
    queryFn: () => services.getActions(params),
    ...options,
  })
}
