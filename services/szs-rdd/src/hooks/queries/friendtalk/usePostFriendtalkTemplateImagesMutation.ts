import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostFriendtalkTemplatesImages, Response } from '~/types/api'

export function usePostFriendtalkTemplateImagesMutation(
  options?: UseMutationOptions<
    Response<PostFriendtalkTemplatesImages.Response>,
    ApiError,
    PostFriendtalkTemplatesImages.Request
  >
) {
  return useMutation<
    Response<PostFriendtalkTemplatesImages.Response>,
    ApiError,
    PostFriendtalkTemplatesImages.Request
  >({
    mutationFn: (payload) => services.postFriendtalkTemplateImages(payload),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.friendtalkImage.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
