import { SortDirection } from '~/constants'

import { AlimlistTemplate } from './getAlimlistTemplates'

export type Request = GetAlimlistTemplatesListRequest
export type Response = GetAlimlistTemplatesListResponse

/**
 * @interface GetAlimlistTemplatesListRequest
 * @param {number} pageSize - 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo - 페이지 번호 (default: 0)
 * @param {string} searchStartDate - 검색 시작일자 (yyyy-MM-dd)
 * @param {string} searchEndDate - 검색 종료일자 (yyyy-MM-dd)
 * @param {string} templateCode - 템플릿 코드
 * @param {string} field - 정렬하고 싶은 Field
 * @param {string} direction - 정렬 방식(Available values : ASC, DESC)
 * @see Swagger - 알림톡 조회 V2
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimlist_templates_api_v1_alimlist_templates_get
 * @url GET /api/v1/Alimlist/templates
 */
export interface GetAlimlistTemplatesListRequest {
  pageSize?: number
  pageNo?: number
  searchStartDate?: string
  searchEndDate?: string
  templateCode?: string | null
  field?: string | null
  direction?: SortDirection
}

/**
 * @interface GetAlimlistTemplatesListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {AlimlistTemplate[]} contents
 * @see Swagger - 푸쉬 템플릿 검색조회(응답)
 */
interface GetAlimlistTemplatesListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: AlimlistTemplate[]
}
