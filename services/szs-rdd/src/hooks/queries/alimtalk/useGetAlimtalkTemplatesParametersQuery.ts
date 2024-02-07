import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkTemplatesParameters, Response } from '~/types/api'

export function useGetAlimtalkTemplatesParametersQuery(
  params: GetAlimtalkTemplatesParameters.Request,
  options?: UseQueryOptions<
    Response<GetAlimtalkTemplatesParameters.Response>,
    ApiError
  >
) {
  return useQuery<Response<GetAlimtalkTemplatesParameters.Response>, ApiError>({
    queryKey: queryKeys.alimtalk.getAlimtalkTemplatesParameters(params),
    queryFn: () => services.getAlimtalkTemplatesParameters(params),
    ...options,
  })
}
