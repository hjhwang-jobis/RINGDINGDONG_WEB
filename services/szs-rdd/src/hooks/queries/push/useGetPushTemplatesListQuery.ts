import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetPushTemplatesList, Response } from '~/types/api'

export function useGetPushTemplatesListQuery(
  params: GetPushTemplatesList.Request,
  options?: UseQueryOptions<Response<GetPushTemplatesList.Response>, ApiError>
) {
  return useQuery<Response<GetPushTemplatesList.Response>, ApiError>({
    queryKey: queryKeys.push.getPushTemplatesList(params),
    queryFn: () => services.getPushTemplatesList(params),
    ...options,
  })
}
