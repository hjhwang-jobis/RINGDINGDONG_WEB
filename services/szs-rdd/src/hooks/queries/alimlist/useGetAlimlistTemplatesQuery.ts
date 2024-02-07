import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimlistTemplates, Response } from '~/types/api'

export function useGetAlimlistTemplatesQuery(
  params: GetAlimlistTemplates.Request,
  options?: UseQueryOptions<Response<GetAlimlistTemplates.Response>, ApiError>
) {
  return useQuery<Response<GetAlimlistTemplates.Response>, ApiError>({
    queryKey: queryKeys.alimlist.getAlimlistTemplates(params),
    queryFn: () => services.getAlimlistTemplates(params),
    ...options,
  })
}
