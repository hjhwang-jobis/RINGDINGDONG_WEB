import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { instance } from '~/api/axiosInstance'

const handleResponse = async <T>(promise: Promise<AxiosResponse>) => {
  try {
    const response = await promise
    if (!response.data) {
      throw new Error('response.data가 유효하지 않습니다.')
    }

    return response.data as T
  } catch (error) {
    throw error
  }
}

export const publicApi = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    handleResponse(instance.get(url, config)),
  post: async <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> => handleResponse(instance.post(url, data, config)),
  put: async <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> => handleResponse(instance.put(url, data, config)),
  delete: async <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> => handleResponse(instance.delete(url, data, config)),
  patch: async <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> => handleResponse(instance.patch(url, data, config)),
} as const
