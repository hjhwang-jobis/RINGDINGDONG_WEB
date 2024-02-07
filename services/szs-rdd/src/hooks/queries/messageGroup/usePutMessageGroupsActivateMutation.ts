import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutMessageGroupsActivate, Response } from '~/types/api'

export function usePutMessageGroupsActivateMutation(
  options?: UseMutationOptions<
    Response<PutMessageGroupsActivate.Response>,
    ApiError,
    PutMessageGroupsActivate.Request
  >
) {
  return useMutation<
    Response<PutMessageGroupsActivate.Response>,
    ApiError,
    PutMessageGroupsActivate.Request
  >({
    mutationFn: (params) => services.putMessageGroupsActivate(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.campaign.BASE)
      queryClient.invalidateQueries(queryKeys.messageGroup.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
