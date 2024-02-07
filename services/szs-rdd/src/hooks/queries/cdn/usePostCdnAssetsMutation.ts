import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostCdnAssets, Response } from '~/types/api'

export function usePostCdnAssetsMutation(
  options?: UseMutationOptions<
    Response<PostCdnAssets.Response>,
    ApiError,
    PostCdnAssets.Request
  >
) {
  return useMutation<
    Response<PostCdnAssets.Response>,
    ApiError,
    PostCdnAssets.Request
  >({
    mutationFn: (payload) => services.postCdnAssets(payload),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.cdn.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
