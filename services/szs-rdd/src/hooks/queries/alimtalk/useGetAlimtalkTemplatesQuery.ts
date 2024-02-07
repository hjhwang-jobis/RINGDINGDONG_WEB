import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkTemplates, Response } from '~/types/api'

export function useGetAlimtalkTemplatesQuery(
  params: GetAlimtalkTemplates.Request,
  options?: UseQueryOptions<Response<GetAlimtalkTemplates.Response>, ApiError>
) {
  return useQuery<Response<GetAlimtalkTemplates.Response>, ApiError>({
    queryKey: queryKeys.alimtalk.getAlimtalkTemplates(params),
    queryFn: () => services.getAlimtalkTemplates(params),
    ...options,
  })
}
