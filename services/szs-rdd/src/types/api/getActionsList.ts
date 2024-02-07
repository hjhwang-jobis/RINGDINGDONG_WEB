import { Action } from './getActions'

/**
 * @see Swagger GET /api/v1/actions 액션 목록 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/get_actions_api_v1_actions_list_get
 */

export type Request = GetActionsListRequest
export type Response = GetActionsListResponse

/**
 * @interface GetActionsListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} name 검색할 액션이름, like 검색
 */
interface GetActionsListRequest {
  pageSize: number
  pageNo: number
  name?: string | null
}

/**
 * @interface ActionsListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {Action[]} contents
 */
interface GetActionsListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: Action[]
}
