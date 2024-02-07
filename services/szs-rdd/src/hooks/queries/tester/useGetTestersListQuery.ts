import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTestersList, Response } from '~/types/api'

export function useGetTestersListQuery(
  params: GetTestersList.Request,
  options?: UseQueryOptions<Response<GetTestersList.Response>, ApiError>
) {
  return useQuery<Response<GetTestersList.Response>, ApiError>({
    queryKey: queryKeys.testers.getTestersList(params),
    queryFn: () => services.getTestersList(params),
    ...options,
  })
}
