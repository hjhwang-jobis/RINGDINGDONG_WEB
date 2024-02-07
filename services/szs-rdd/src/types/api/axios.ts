import { AxiosResponse } from 'axios'

import { ApiError, Response } from '~/types/api'

export type ResolvedResponse<T> = AxiosResponse<Response<T>>
export type RejectedResponse = AxiosResponse<ApiError>
