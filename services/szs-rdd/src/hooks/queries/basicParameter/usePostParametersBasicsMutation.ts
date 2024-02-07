import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PostParametersBasics, Response } from '~/types/api'

export function usePostParametersBasicsMutation(
  options?: UseMutationOptions<
    Response<PostParametersBasics.Response>,
    ApiError,
    PostParametersBasics.Request
  >
) {
  return useMutation<
    Response<PostParametersBasics.Response>,
    ApiError,
    PostParametersBasics.Request
  >({
    mutationFn: (params) => services.postParametersBasics(params),
    ...options,
  })
}
