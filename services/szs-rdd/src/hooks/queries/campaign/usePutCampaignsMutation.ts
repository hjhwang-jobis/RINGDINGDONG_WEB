import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutCampaigns, Response } from '~/types/api'

export function usePutCampaignsMutation(
  options?: UseMutationOptions<
    Response<PutCampaigns.Response>,
    ApiError,
    PutCampaigns.Request
  >
) {
  return useMutation<
    Response<PutCampaigns.Response>,
    ApiError,
    PutCampaigns.Request
  >({
    mutationFn: (params) => services.putCampaigns(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.campaign.BASE)
      queryClient.invalidateQueries(queryKeys.action.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
