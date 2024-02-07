import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostAlimlistSend, Response } from '~/types/api'

export function usePostAlimlistSendMutation(
  options?: UseMutationOptions<
    Response<PostAlimlistSend.Response>,
    ApiError,
    PostAlimlistSend.Request
  >
) {
  return useMutation<
    Response<PostAlimlistSend.Response>,
    ApiError,
    PostAlimlistSend.Request
  >({
    mutationFn: (params) => services.postAlimlistSend(params),
    ...options,
  })
}
