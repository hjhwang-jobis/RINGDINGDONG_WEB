import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostCampaigns, Response } from '~/types/api'

export function usePostCampaignsMutation(
  options?: UseMutationOptions<
    Response<PostCampaigns.Response>,
    ApiError,
    PostCampaigns.Request
  >
) {
  return useMutation<
    Response<PostCampaigns.Response>,
    ApiError,
    PostCampaigns.Request
  >({
    mutationFn: (params) => services.postCampaigns(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.campaign.BASE)
      queryClient.invalidateQueries(queryKeys.action.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
