import { Parameter } from '~/types'

/**
 * @see Swagger GET /api/v1/parameters/basics 기본 파라미터 목록 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_parameters_api_v1_parameters_basics_get
 */

export type Request = GetBasicParametersListRequest
export type Response = GetBasicParametersListResponse

/**
 * @interface GetBasicParametersListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} parameter 검색할 파라미터명, like 검색
 * @param {string} title 검색할 타이틀명, like 검색
 */
interface GetBasicParametersListRequest {
  pageSize: number
  pageNo: number
  parameter?: string | null
  title?: string | null
}

/**
 * @interface GetBasicParametersListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {Parameter[]} contents
 */
interface GetBasicParametersListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: Parameter[]
}
