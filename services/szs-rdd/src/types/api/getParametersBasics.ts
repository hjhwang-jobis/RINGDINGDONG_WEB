import { Parameter } from '~/types'

/**
 * @see Swagger GET /api/v1/parameters/basics/{parameterId} 기본 파라미터 상세 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_parameter_api_v1_parameters_basics__parameterId__get
 */

export type Request = GetBasicParametersRequest
export type Response = GetBasicParametersResponse

/**
 * @interface GetBasicParametersRequest
 * @param {number} parameterId 파라미터 아이디
 */
interface GetBasicParametersRequest {
  parameterId: number
}

type GetBasicParametersResponse = Parameter
