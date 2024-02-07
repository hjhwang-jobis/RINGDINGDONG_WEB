import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutMessageGroups, Response } from '~/types/api'

export function usePutMessageGroupsMutation(
  options?: UseMutationOptions<
    Response<PutMessageGroups.Response>,
    ApiError,
    PutMessageGroups.Request
  >
) {
  return useMutation<
    Response<PutMessageGroups.Response>,
    ApiError,
    PutMessageGroups.Request
  >({
    mutationFn: (params) => services.putMessageGroups(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.campaign.BASE)
      queryClient.invalidateQueries(queryKeys.messageGroup.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
