import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostFriendtalkSend, Response } from '~/types/api'

export function usePostFriendtalkSendMutation(
  options?: UseMutationOptions<
    Response<PostFriendtalkSend.Response>,
    ApiError,
    PostFriendtalkSend.Request
  >
) {
  return useMutation<
    Response<PostFriendtalkSend.Response>,
    ApiError,
    PostFriendtalkSend.Request
  >({
    mutationFn: (params) => services.postFriendtalkSend(params),
    ...options,
  })
}
