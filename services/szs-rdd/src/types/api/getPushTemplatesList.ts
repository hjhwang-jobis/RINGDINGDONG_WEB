import { SortDirection } from '~/constants'

import { PushTemplate } from './getPushTemplates'

/**
 * @see Swagger GET /api/v1/push/templates/list (푸쉬 템플릿 목록 조회)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_push_templates_api_v1_push_templates_list_get
 */

export type Request = GetPushTemplatesListRequest
export type Response = GetPushTemplatesListResponse

/**
 * @interface GetPushTemplatesListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} searchStartDate 검색 시작일자 (yyyy-MM-dd)
 * @param {string} searchEndDate 검색 종료일자 (yyyy-MM-dd)
 * @param {string} templateCode 템플릿 코드
 * @param {string} field 정렬하고 싶은 Field
 * @param {SortDirection} direction 정렬 방식
 */
interface GetPushTemplatesListRequest {
  pageSize: number
  pageNo: number
  searchStartDate?: string
  searchEndDate?: string
  templateCode?: string | null
  field?: string
  direction: SortDirection
}

/**
 * @interface GetPushTemplatesListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {PushTemplate[]} contents
 */
interface GetPushTemplatesListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: PushTemplate[]
}
