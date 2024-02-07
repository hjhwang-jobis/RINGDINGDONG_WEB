import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkTemplatesList, Response } from '~/types/api'

export function useGetAlimtalkTemplatesListQuery(
  params: GetAlimtalkTemplatesList.Request,
  options?: UseQueryOptions<
    Response<GetAlimtalkTemplatesList.Response>,
    ApiError
  >
) {
  return useQuery<Response<GetAlimtalkTemplatesList.Response>, ApiError>({
    queryKey: queryKeys.alimtalk.getAlimtalkTemplatesList(params),
    queryFn: () => services.getAlimtalkTemplatesList(params),
    ...options,
  })
}
