import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostFriendtalkTemplatesBase, Response } from '~/types/api'

export function usePostFriendtalkTemplatesBaseMutation(
  options?: UseMutationOptions<
    Response<PostFriendtalkTemplatesBase.Response>,
    ApiError,
    PostFriendtalkTemplatesBase.Request
  >
) {
  return useMutation<
    Response<PostFriendtalkTemplatesBase.Response>,
    ApiError,
    PostFriendtalkTemplatesBase.Request
  >({
    mutationFn: (params) => services.postFriendtalkTemplatesBase(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.friendtalk.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
