import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutTesters, Response } from '~/types/api'

export function usePutTestersMutation(
  options?: UseMutationOptions<
    Response<PutTesters.Response>,
    ApiError,
    PutTesters.Request
  >
) {
  return useMutation<
    Response<PutTesters.Response>,
    ApiError,
    PutTesters.Request
  >({
    mutationFn: (params) => services.putTesters(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.testers.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
