import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { ApiError } from '~/types/api'
import { PutTarget, Response } from '~/types/api'

export function usePutTargetMutation(
  options?: UseMutationOptions<
    Response<PutTarget.Response>,
    ApiError,
    PutTarget.Request
  >
) {
  return useMutation<Response<PutTarget.Response>, ApiError, PutTarget.Request>(
    {
      mutationFn: (params) => services.putTargets(params),
      ...options,
    }
  )
}
