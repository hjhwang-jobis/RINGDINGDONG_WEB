import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetParametersBasicsList, Response } from '~/types/api'

export function useGetParametersBasicsListQuery(
  params: GetParametersBasicsList.Request,
  options?: UseQueryOptions<
    Response<GetParametersBasicsList.Response>,
    ApiError
  >
) {
  return useQuery<Response<GetParametersBasicsList.Response>, ApiError>({
    queryKey: queryKeys.basicParameter.getParametersBasicsList(params),
    queryFn: () => services.getParametersBasicsList(params),
    ...options,
  })
}
