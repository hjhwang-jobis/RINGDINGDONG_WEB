import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTargetsQueries, Response } from '~/types/api'

export function useGetTargetsQueriesOneQuery(
  params: GetTargetsQueries.Request,
  options?: UseQueryOptions<Response<GetTargetsQueries.Response>, ApiError>
) {
  return useQuery<Response<GetTargetsQueries.Response>, ApiError>({
    queryKey: queryKeys.targetQuery.getTargetsQueries(params),
    queryFn: () => services.getTargetsQueries(params),
    ...options,
  })
}
