import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetCdnAssetsList, Response } from '~/types/api'

export function useGetCdnAssetsListQuery(
  params: GetCdnAssetsList.Request,
  options?: UseQueryOptions<Response<GetCdnAssetsList.Response>, ApiError>
) {
  return useQuery<Response<GetCdnAssetsList.Response>, ApiError>({
    queryKey: queryKeys.cdn.getCdnAssetsList(params),
    queryFn: () => services.getCdnAssetsList(params),
    ...options,
  })
}
