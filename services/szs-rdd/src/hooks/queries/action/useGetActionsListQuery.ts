import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetActionsList, Response } from '~/types/api'

export function useGetActionsListQuery(
  params: GetActionsList.Request,
  options?: UseQueryOptions<Response<GetActionsList.Response>, ApiError>
) {
  return useQuery<Response<GetActionsList.Response>, ApiError>({
    queryKey: queryKeys.action.getActionsList(params),
    queryFn: () => services.getActionsList(params),
    ...options,
  })
}
