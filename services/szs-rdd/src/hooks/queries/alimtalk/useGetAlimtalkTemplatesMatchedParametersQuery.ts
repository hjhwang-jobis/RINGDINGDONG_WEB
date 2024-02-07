import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkTemplatesMatchedParameters, Response } from '~/types/api'

export function useGetAlimtalkTemplatesMatchedParametersQuery(
  params: GetAlimtalkTemplatesMatchedParameters.Request,
  options?: UseQueryOptions<
    Response<GetAlimtalkTemplatesMatchedParameters.Response>,
    ApiError
  >
) {
  return useQuery<
    Response<GetAlimtalkTemplatesMatchedParameters.Response>,
    ApiError
  >({
    queryKey: queryKeys.alimtalk.getAlimtalkTemplatesMatchedParameters(params),
    queryFn: () => services.getAlimtalkTemplatesMatchedParameters(params),
    ...options,
  })
}
