import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { queryClient } from '~/api/reactQuery'
import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { PostAlimlistTemplates, Response } from '~/types/api'

export default function usePostAlimlistTemplatesMutation(
  options?: UseMutationOptions<
    Response<PostAlimlistTemplates.Response>,
    ApiError,
    PostAlimlistTemplates.Request
  >
) {
  return useMutation<
    Response<PostAlimlistTemplates.Response>,
    ApiError,
    PostAlimlistTemplates.Request
  >({
    mutationFn: (params) => services.postAlimlistTemplates(params),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.alimlist.BASE)
      options?.onSuccess?.(data, variables, context)
    },
  })
}
