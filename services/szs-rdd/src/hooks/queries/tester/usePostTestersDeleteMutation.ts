import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostTestersDelete, Response } from '~/types/api'

export function usePostTestersDeleteMutation(
  options?: UseMutationOptions<
    Response<PostTestersDelete.Response>,
    ApiError,
    PostTestersDelete.Request
  >
) {
  return useMutation<
    Response<PostTestersDelete.Response>,
    ApiError,
    PostTestersDelete.Request
  >({
    mutationFn: (params) => services.postTestersDelete(params),
    ...options,
  })
}
