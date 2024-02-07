import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTargets, Response } from '~/types/api'

export function useGetTargetsQuery(
  params: GetTargets.Request,
  options?: UseQueryOptions<Response<GetTargets.Response>, ApiError>
) {
  return useQuery<Response<GetTargets.Response>, ApiError>({
    queryKey: queryKeys.target.getTargets(params),
    queryFn: () => services.getTargets(params),
    ...options,
  })
}
