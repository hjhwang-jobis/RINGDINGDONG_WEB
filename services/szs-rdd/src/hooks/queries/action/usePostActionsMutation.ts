import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostActions, Response } from '~/types/api'

export function usePostActionsMutation(
  options?: UseMutationOptions<
    Response<PostActions.Response>,
    ApiError,
    PostActions.Request
  >
) {
  return useMutation<
    Response<PostActions.Response>,
    ApiError,
    PostActions.Request
  >({
    mutationFn: (params) => services.postActions(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.action.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
