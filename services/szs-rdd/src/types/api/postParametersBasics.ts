/**
 * @see Swagger POST /api/v1/parameters/basics (기본 파라미터 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/create_parameter_api_v1_parameters_basics_post
 */

export type Request = PostParametersBasicsRequest
export type Response = {}

/**
 * @interface PostParametersBasicsRequest
 * @param {string} title 쿼리 제목
 * @param {string} description 쿼리 상세 설명
 * @param {string} parameter 쿼리
 */
export interface PostParametersBasicsRequest {
  title: string
  description: string
  parameter: string
}
