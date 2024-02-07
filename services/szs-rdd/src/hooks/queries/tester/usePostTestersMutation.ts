import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostTesters, Response } from '~/types/api'

export function usePostTestersMutation(
  options?: UseMutationOptions<
    Response<PostTesters.Response>,
    ApiError,
    PostTesters.Request
  >
) {
  return useMutation<
    Response<PostTesters.Response>,
    ApiError,
    PostTesters.Request
  >({
    mutationFn: (params) => services.postTesters(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.testers.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
