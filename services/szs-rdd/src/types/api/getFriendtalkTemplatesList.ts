import { SortDirection } from '~/constants'

import { FriendtalkTemplate } from './getFriendtalkTemplates'

/**
 * @see Swagger GET /api/v1/friendtalks/templates/list
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_templates_api_v1_friendtalk_templates_list_get
 */

export type Request = GetFriendtalkTemplatesListRequest
export type Response = GetFriendtalkTemplatesListResponse

/**
 * @interface GetFriendtalkTemplatesListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} searchStartDate 검색 시작일자 (yyyy-MM-dd)
 * @param {string} searchEndDate 검색 종료일자 (yyyy-MM-dd)
 * @param {string} templateCode 템플릿 코드
 * @param {string} sendProfile 발신 프로필
 * @param {string} field 정렬하고 싶은 Field
 * @param {SortDirection} direction 정렬 방식(ASC, DESC)
 */
interface GetFriendtalkTemplatesListRequest {
  pageSize: number
  pageNo: number
  searchStartDate?: string | null
  searchEndDate?: string | null
  templateCode?: string | null
  field?: string | null
  direction: SortDirection
}

/**
 * @interface GetFriendtalkTemplatesListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {FriendtalkTemplate[]} contents
 */
interface GetFriendtalkTemplatesListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: FriendtalkTemplate[]
}
