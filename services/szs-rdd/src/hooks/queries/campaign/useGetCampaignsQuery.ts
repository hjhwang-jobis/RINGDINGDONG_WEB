import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetCampaigns, Response } from '~/types/api'

export function useGetCampaignsQuery(
  params: GetCampaigns.Request,
  options?: UseQueryOptions<Response<GetCampaigns.Response>, ApiError>
) {
  return useQuery<Response<GetCampaigns.Response>, ApiError>({
    queryKey: queryKeys.campaign.getCampaigns(params),
    queryFn: () => services.getCampaigns(params),
    ...options,
  })
}
