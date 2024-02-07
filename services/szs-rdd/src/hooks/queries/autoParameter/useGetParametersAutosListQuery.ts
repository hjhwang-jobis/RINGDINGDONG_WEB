import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetParametersAutosList, Response } from '~/types/api'

export function useGetParametersAutosListQuery(
  params: GetParametersAutosList.Request,
  options?: UseQueryOptions<Response<GetParametersAutosList.Response>, ApiError>
) {
  return useQuery<Response<GetParametersAutosList.Response>, ApiError>({
    queryKey: queryKeys.autoParameter.getParametersAutosList(params),
    queryFn: () => services.getParametersAutosList(params),
    ...options,
  })
}
