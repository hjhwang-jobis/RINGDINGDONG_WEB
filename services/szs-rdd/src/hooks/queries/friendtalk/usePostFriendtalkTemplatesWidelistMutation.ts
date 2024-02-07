import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostFriendtalkTemplatesWidelist, Response } from '~/types/api'

export function usePostFriendtalkTemplatesWidelistMutation(
  options?: UseMutationOptions<
    Response<PostFriendtalkTemplatesWidelist.Response>,
    ApiError,
    PostFriendtalkTemplatesWidelist.Request
  >
) {
  return useMutation<
    Response<PostFriendtalkTemplatesWidelist.Response>,
    ApiError,
    PostFriendtalkTemplatesWidelist.Request
  >({
    mutationFn: (params) => services.postFriendtalkTemplatesWidelist(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.friendtalk.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
