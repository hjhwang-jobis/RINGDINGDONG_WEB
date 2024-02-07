import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTargetsList, Response } from '~/types/api'

export function useGetTargetsListQuery(
  params: GetTargetsList.Request,
  options?: UseQueryOptions<Response<GetTargetsList.Response>, ApiError>
) {
  return useQuery<Response<GetTargetsList.Response>, ApiError>({
    queryKey: queryKeys.target.getTargetsList(params),
    queryFn: () => services.getTargetsList(params),
    ...options,
  })
}
