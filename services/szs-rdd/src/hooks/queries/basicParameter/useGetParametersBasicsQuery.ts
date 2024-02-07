import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetParametersBasics, Response } from '~/types/api'

export function useGetParametersBasicsOneQuery(
  params: GetParametersBasics.Request,
  options?: UseQueryOptions<Response<GetParametersBasics.Response>, ApiError>
) {
  return useQuery<Response<GetParametersBasics.Response>, ApiError>({
    queryKey: queryKeys.basicParameter.getParametersBasics(params),
    queryFn: () => services.getParametersBasics(params),
    ...options,
  })
}
