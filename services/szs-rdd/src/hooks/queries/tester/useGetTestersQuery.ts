import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTesters, Response } from '~/types/api'

export function useGetTestersQuery(
  params: GetTesters.Request,
  options?: UseQueryOptions<Response<GetTesters.Response>, ApiError>
) {
  return useQuery<Response<GetTesters.Response>, ApiError>({
    queryKey: queryKeys.testers.getTesters(params),
    queryFn: () => services.getTesters(params),
    ...options,
  })
}
