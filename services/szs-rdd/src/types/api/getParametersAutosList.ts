import { Parameter } from '~/types'

/**
 * @see Swagger GET /api/v1/parameters/basics 자동계산 파라미터 목록 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EC%9E%90%EB%8F%99%EA%B3%84%EC%82%B0%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0/get_parameters_api_v1_parameters_autos_list_get
 */

export type Request = GetAutoParametersListRequest
export type Response = GetAutoParametersListResponse

/**
 * @interface GetAutoParametersListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} parameter 검색할 파라미터명, like 검색
 * @param {string} title 검색할 타이틀명, like 검색
 */
interface GetAutoParametersListRequest {
  pageSize: number
  pageNo: number
  parameter?: string | null
  title?: string | null
}

/**
 * @interface GetAutoParametersListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {Parameter[]} contents
 */
interface GetAutoParametersListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: Parameter[]
}
