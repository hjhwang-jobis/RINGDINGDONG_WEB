import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostTarget, Response } from '~/types/api'

export function usePostTargetMutation(
  options?: UseMutationOptions<
    Response<PostTarget.Response>,
    ApiError,
    PostTarget.Request
  >
) {
  return useMutation<
    Response<PostTarget.Response>,
    ApiError,
    PostTarget.Request
  >({
    mutationFn: (params) => services.postTargets(params),
    ...options,
  })
}
