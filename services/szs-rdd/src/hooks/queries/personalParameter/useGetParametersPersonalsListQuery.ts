import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetParametersPersonalsList, Response } from '~/types/api'

export function useGetParametersPersonalsListQuery(
  params: GetParametersPersonalsList.Request,
  options?: UseQueryOptions<
    Response<GetParametersPersonalsList.Response>,
    ApiError
  >
) {
  return useQuery<Response<GetParametersPersonalsList.Response>, ApiError>({
    queryKey: queryKeys.personalParameter.getParametersPersonalsList(params),
    queryFn: () => services.getParametersPersonalsList(params),
    ...options,
  })
}
