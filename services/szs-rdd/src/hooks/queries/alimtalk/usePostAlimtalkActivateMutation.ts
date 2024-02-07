import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostAlimtalkActivate, Response } from '~/types/api'

export function usePostAlimtalkActivateMutation(
  options?: UseMutationOptions<
    Response<PostAlimtalkActivate.Response>,
    ApiError,
    PostAlimtalkActivate.Request
  >
) {
  return useMutation<
    Response<PostAlimtalkActivate.Response>,
    ApiError,
    PostAlimtalkActivate.Request
  >({
    mutationFn: (params) => services.postAlimtalkActivate(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.alimtalk.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
