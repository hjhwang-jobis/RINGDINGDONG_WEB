import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutActions, Response } from '~/types/api'

export function usePutActionsMutation(
  options?: UseMutationOptions<
    Response<PutActions.Response>,
    ApiError,
    PutActions.Request
  >
) {
  return useMutation<
    Response<PutActions.Response>,
    ApiError,
    PutActions.Request
  >({
    mutationFn: (params) => services.putActions(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.action.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
