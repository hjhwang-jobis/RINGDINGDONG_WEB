import { QueryClient } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { publicApi as _publicApi } from '~/api'
import { Response } from '~/types/api'

export const queryClient = new QueryClient()

queryClient.setDefaultOptions({
  queries: {
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  },
})

export const publicApi = {
  get: async <T>(url: string, config?: AxiosRequestConfig) =>
    await _publicApi.get<Response<T>>(url, config),
  post: async <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    await _publicApi.post<Response<T>>(url, data, config),
  put: async <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    await _publicApi.put<Response<T>>(url, data, config),
  delete: async <T>(url: string, config?: AxiosRequestConfig) =>
    await _publicApi.delete<Response<T>>(url, config),
  patch: async <T>(url: string, data?: object, config?: AxiosRequestConfig) =>
    await _publicApi.patch<Response<T>>(url, data, config),
} as const
