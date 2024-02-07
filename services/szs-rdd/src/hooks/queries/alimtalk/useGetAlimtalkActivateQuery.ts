import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkActivate, Response } from '~/types/api'

export function useGetAlimtalkActivateQuery(
  params: GetAlimtalkActivate.Request,
  options?: UseQueryOptions<Response<GetAlimtalkActivate.Response>, ApiError>
) {
  return useQuery<Response<GetAlimtalkActivate.Response>, ApiError>({
    queryKey: queryKeys.alimtalk.getAlimtalkActivate(params),
    queryFn: () => services.getAlimtalkActivate(params),
    ...options,
  })
}
