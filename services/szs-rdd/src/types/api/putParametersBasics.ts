/**
 * @see Swagger PUT /api/v1/parameters/basics/{parameterId} (기본 파라미터 수정)
 * https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/update_parameter_api_v1_parameters_basics__parameterId__put
 */

export type Request = PutParametersBasicsMutationRequest
export type Response = {}

/**
 * @interface PutParametersBasicsMutationRequest
 * @param {number} parameterId 파라미터 아이디
 * @param {string} title 쿼리 제목
 * @param {string} description 쿼리 상세 설명
 */
export interface PutParametersBasicsMutationRequest {
  parameterId: number
  title: string
  description: string
}
