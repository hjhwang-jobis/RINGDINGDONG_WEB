import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostPushSend, Response } from '~/types/api'

export function usePostPushSendMutation(
  options?: UseMutationOptions<
    Response<PostPushSend.Response>,
    ApiError,
    PostPushSend.Request
  >
) {
  return useMutation<
    Response<PostPushSend.Response>,
    ApiError,
    PostPushSend.Request
  >({
    mutationFn: (params) => services.postPushSend(params),
    ...options,
  })
}
