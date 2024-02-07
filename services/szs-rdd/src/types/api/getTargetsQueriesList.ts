import { TargetQuery } from './getTargetsQueries'

/**
 * @see Swagger GET /api/v1/targets/queries 타겟 쿼리 목록 조회
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/get_target_queries_api_v1_targets_queries_get
 */

export type Request = GetTargetsQueriesRequest
export type Response = GetTargetsQueriesResponse

/**
 * @interface GetTargetsQueriesRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} queryId 검색할 queryId, only exactly matching
 * @param {string} title 검색할 타겟명, like 검색
 */
interface GetTargetsQueriesRequest {
  pageSize: number
  pageNo: number
  queryId?: string | null
  title?: string | null
}

/**
 * @interface GetTargetsQueriesResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {TargetQuery[]} contents
 */
interface GetTargetsQueriesResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: TargetQuery[]
}
