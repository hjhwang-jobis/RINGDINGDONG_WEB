import { Target } from './getTargets'

/**
 * @see Swagger GET /api/v1/targets
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/get_targets_api_v1_targets_get
 */

export type Request = GetTargetsListRequest
export type Response = GetTargetsListResponse

/**
 * @interface GetTargetsListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} targetId 검색할 targetId, only exactly matching
 * @param {string} title 검색할 타겟명, like 검색
 */
interface GetTargetsListRequest {
  pageSize: number
  pageNo: number
  targetId?: string | null
  title?: string | null
}

/**
 * @interface GetTargetsListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {Target[]} contents
 */
interface GetTargetsListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: Target[]
}
