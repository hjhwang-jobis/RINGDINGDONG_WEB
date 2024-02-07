import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostTargetsQueries, Response } from '~/types/api'

export function usePostTargetsQueriesMutation(
  options?: UseMutationOptions<
    Response<PostTargetsQueries.Response>,
    ApiError,
    PostTargetsQueries.Request
  >
) {
  return useMutation<
    Response<PostTargetsQueries.Response>,
    ApiError,
    PostTargetsQueries.Request
  >({
    mutationFn: (params) => services.postTargetsQueries(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.target.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
