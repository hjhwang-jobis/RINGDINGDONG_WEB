import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostPushTemplates, Response } from '~/types/api'

export function usePostPushTemplatesMutation(
  options?: UseMutationOptions<
    Response<PostPushTemplates.Response>,
    ApiError,
    PostPushTemplates.Request
  >
) {
  return useMutation<
    Response<PostPushTemplates.Response>,
    ApiError,
    PostPushTemplates.Request
  >({
    mutationFn: (params) => services.postPushTemplates(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.push.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
