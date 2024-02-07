import { createInstance } from '@3o3/axios'
import { AxiosResponse } from 'axios'

import { ApiError, Response } from '~/types/api'
import { getToken, isTokenExpired } from '~/utils/keyCloak'

export const HTTP_STATUS_UNAUTHENTICATED = '401'
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = '500'

export function isUnauthenticated(status?: string) {
  return status === HTTP_STATUS_UNAUTHENTICATED
}

export type ResolvedResponse<T> = AxiosResponse<Response<T>> & {
  axiosError: any
}
export type RejectedResponse = AxiosResponse<ApiError>

function createInternalServerError() {
  return Promise.reject<RejectedResponse>({
    code: HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message: '알 수 없는 오류가 발생하였습니다.',
    status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
  })
}

function getRejected<T>(response: ResolvedResponse<T>) {
  if (!response || !response.data) return createInternalServerError()

  const { data } = response
  if (data.ok) return

  // NOTE: 링딩동의 에러 메시지 처리
  if (data.error?.message) {
    return Promise.reject<RejectedResponse>({
      ...data.error,
    })
  }

  // NOTE: 딩동의 에러 메시지 처리
  const errorMsgFromDingdong =
    response.axiosError?.response?.data?.detail[0].msg
  if (errorMsgFromDingdong) {
    const errorFromDingdong = {
      code: -1,
      message: errorMsgFromDingdong,
    }

    return Promise.reject<RejectedResponse>({
      ...errorFromDingdong,
    })
  }

  return Promise.reject<RejectedResponse>({
    ...data.error,
  })
}

function createAxiosInstance() {
  const instance = createInstance({
    instanceName: 'axios_rdd',
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 1000 * 1000,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use(
    function (config: any) {
      if (isTokenExpired()) {
        // TODO keycloak의 토큰 생명 주기가 짧아졌을 때의 처리가 필요합니다.
        throw new Error('Token has expired')
      }
      // NOTE: 요청 전에 keycloak의 토큰을 설정합니다.
      config.headers['jwt'] = getToken()

      return config
    },
    // eslint-disable-next-line
    function (error: any) {
      // TODO Error handling
    }
  )

  instance.interceptors.response.use<
    ResolvedResponse<unknown> | RejectedResponse
  >(
    <T>(response: ResolvedResponse<T>) => {
      return response
    },
    (error: any) => {
      const rejected = getRejected(error)
      if (rejected) return rejected

      return createInternalServerError()
    }
  )

  return instance
}

export const instance = createAxiosInstance()
