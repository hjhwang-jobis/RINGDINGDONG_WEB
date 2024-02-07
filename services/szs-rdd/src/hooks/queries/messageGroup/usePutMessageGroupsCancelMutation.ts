import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutMessageGroupsCancel, Response } from '~/types/api'

export function usePutMessageGroupsCancelMutation(
  options?: UseMutationOptions<
    Response<PutMessageGroupsCancel.Response>,
    ApiError,
    PutMessageGroupsCancel.Request
  >
) {
  return useMutation<
    Response<PutMessageGroupsCancel.Response>,
    ApiError,
    PutMessageGroupsCancel.Request
  >({
    mutationFn: (params) => services.putMessageGroupsCancel(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.campaign.BASE)
      queryClient.invalidateQueries(queryKeys.messageGroup.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
