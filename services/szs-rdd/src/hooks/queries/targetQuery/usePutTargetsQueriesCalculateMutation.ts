import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PutTargetsQueriesCalculate, Response } from '~/types/api'

export function usePutTargetsQueriesCalculateMutation(
  options?: UseMutationOptions<
    Response<PutTargetsQueriesCalculate.Response>,
    ApiError,
    PutTargetsQueriesCalculate.Request
  >
) {
  return useMutation<
    Response<PutTargetsQueriesCalculate.Response>,
    ApiError,
    PutTargetsQueriesCalculate.Request
  >({
    mutationFn: (params) => services.putTargetsQueriesCalculate(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.target.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
