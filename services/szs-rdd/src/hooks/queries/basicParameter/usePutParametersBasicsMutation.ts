import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PutParametersBasics, Response } from '~/types/api'

export function usePutParametersBasicsMutation(
  options?: UseMutationOptions<
    Response<PutParametersBasics.Response>,
    ApiError,
    PutParametersBasics.Request
  >
) {
  return useMutation<
    Response<PutParametersBasics.Response>,
    ApiError,
    PutParametersBasics.Request
  >({
    mutationFn: (params) => services.putParametersBasics(params),
    ...options,
  })
}
