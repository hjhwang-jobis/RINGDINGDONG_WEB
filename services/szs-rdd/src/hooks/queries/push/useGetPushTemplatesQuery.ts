import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetPushTemplates, Response } from '~/types/api'

export function useGetPushTemplatesQuery(
  params: GetPushTemplates.Request,
  options?: UseQueryOptions<Response<GetPushTemplates.Response>, ApiError>
) {
  return useQuery<Response<GetPushTemplates.Response>, ApiError>({
    queryKey: queryKeys.push.getPushTemplates(params),
    queryFn: () => services.getPushTemplates(params),
    ...options,
  })
}
