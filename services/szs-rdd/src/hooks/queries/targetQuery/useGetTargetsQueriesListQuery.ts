import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetTargetsQueriesList, Response } from '~/types/api'

export function useGetTargetQueriresListQuery(
  params: GetTargetsQueriesList.Request,
  options?: UseQueryOptions<Response<GetTargetsQueriesList.Response>, ApiError>
) {
  return useQuery<Response<GetTargetsQueriesList.Response>, ApiError>({
    queryKey: queryKeys.targetQuery.getTargetsQueriesList(params),
    queryFn: () => services.getTargetsQueriesList(params),
    ...options,
  })
}
