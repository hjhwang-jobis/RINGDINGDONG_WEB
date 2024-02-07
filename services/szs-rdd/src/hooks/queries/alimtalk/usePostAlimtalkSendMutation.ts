import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostAlimtalkSend, Response } from '~/types/api'

export function usePostAlimtalkSendMutation(
  options?: UseMutationOptions<
    Response<PostAlimtalkSend.Response>,
    ApiError,
    PostAlimtalkSend.Request
  >
) {
  return useMutation<
    Response<PostAlimtalkSend.Response>,
    ApiError,
    PostAlimtalkSend.Request
  >({
    mutationFn: (params) => services.postAlimtalkSend(params),
    ...options,
  })
}
