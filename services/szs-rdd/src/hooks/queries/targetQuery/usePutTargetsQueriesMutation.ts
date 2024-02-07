import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutTargetsQueries, Response } from '~/types/api'

export function usePutTargetsQueriesMutation(
  options?: UseMutationOptions<
    Response<PutTargetsQueries.Response>,
    ApiError,
    PutTargetsQueries.Request
  >
) {
  return useMutation<
    Response<PutTargetsQueries.Response>,
    ApiError,
    PutTargetsQueries.Request
  >({
    mutationFn: (params) => services.putTargetsQueries(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.target.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
