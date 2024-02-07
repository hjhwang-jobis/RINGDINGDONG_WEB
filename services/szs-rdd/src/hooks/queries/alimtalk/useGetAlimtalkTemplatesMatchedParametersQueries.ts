import { useQueries, UseQueryOptions } from '@tanstack/react-query'

import services from '~/api/service'
import { queryKeys } from '~/keys/queries'
import { ApiError } from '~/types/api'
import { GetAlimtalkTemplatesMatchedParameters, Response } from '~/types/api'

// NOTE: https://tanstack.com/query/v4/docs/react/guides/parallel-queries
export function useGetAlimtalkTemplatesMatchedParametersQueries(
  requests: GetAlimtalkTemplatesMatchedParameters.Request[],
  options?: UseQueryOptions<
    Response<GetAlimtalkTemplatesMatchedParameters.Response>,
    ApiError
  >
) {
  return useQueries({
    queries: requests.map((request) => {
      return {
        queryKey:
          queryKeys.alimtalk.getAlimtalkTemplatesMatchedParameters(request),
        queryFn: () => services.getAlimtalkTemplatesMatchedParameters(request),
        ...options,
      }
    }),
  })
}
