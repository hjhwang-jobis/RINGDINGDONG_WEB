import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostFriendtalkTemplatesCarousel, Response } from '~/types/api'

export function usePostFriendtalkTemplatesCarouselMutation(
  options?: UseMutationOptions<
    Response<PostFriendtalkTemplatesCarousel.Response>,
    ApiError,
    PostFriendtalkTemplatesCarousel.Request
  >
) {
  return useMutation<
    Response<PostFriendtalkTemplatesCarousel.Response>,
    ApiError,
    PostFriendtalkTemplatesCarousel.Request
  >({
    mutationFn: (params) => services.postFriendtalkTemplatesCarousel(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.friendtalk.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
