import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimlistTemplatesList, Response } from '~/types/api'

export function useGetAlimlistTemplatesListQuery(
  params: GetAlimlistTemplatesList.Request,
  options?: UseQueryOptions<
    Response<GetAlimlistTemplatesList.Response>,
    ApiError
  >
) {
  return useQuery<Response<GetAlimlistTemplatesList.Response>, ApiError>({
    queryKey: queryKeys.alimlist.getAlimlistTemplatesList(params),
    queryFn: () => services.getAlimlistTemplatesList(params),
    ...options,
  })
}
