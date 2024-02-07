import { SendProfile, SortDirection } from '~/constants'

import { AlimtalkTemplate } from './getAlimtalkTemplates'

/**
 * @see Swagger GET /api/v1/alimtalk/templates/list 알림톡 템플릿 목록 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_templates_api_v1_alimtalk_templates_list_get
 */

export type Request = GetAlimtalkTemplatesListRequest

/**
 * @interface GetAlimtalkTemplatesListRequest
 * @param {number} pageSize - 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo - 페이지 번호 (default: 0)
 * @param {string} searchStartDate - 검색 시작일자 (yyyy-MM-dd)
 * @param {string} searchEndDate - 검색 종료일자 (yyyy-MM-dd)
 * @param {string} templateCode - 템플릿 코드
 * @param {string} name - 템플릿 명
 * @param {SendProfile} profile - 발신 프로필
 * @param {boolean} includeDeleted - 이력 포함 여부
 * @param {string} field - 정렬하고 싶은 Field
 * @param {SortDirection} direction - 정렬 방식(Available values : ASC, DESC)
 */
export interface GetAlimtalkTemplatesListRequest {
  pageSize?: number
  pageNo?: number
  searchStartDate?: string
  searchEndDate?: string
  templateCode?: string | null
  name?: string | null
  profile?: SendProfile | null
  includeDeleted?: boolean | null
  field?: string | null
  direction?: SortDirection
}

/**
 * @interface Response
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {AlimtalkTemplate[]} contents
 */
export interface Response {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: AlimtalkTemplate[]
}
