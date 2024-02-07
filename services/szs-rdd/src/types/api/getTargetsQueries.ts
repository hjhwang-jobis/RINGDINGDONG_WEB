import { Author } from '~/types'

/**
 * @see Swagger GET /api/v1/targets/queries/{targetQueryId} 타겟 쿼리 상세 조회
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/get_target_query_api_v1_targets_queries__targetQueryId__get
 */

export type Request = GetTargetsQueriesRequest
export type Response = GetTargetsQueriesResponse

/**
 * @interface GetTargetsQueriesRequest
 * @param {string} targetQueryId 검색할 queryId, only exactly matching
 */
interface GetTargetsQueriesRequest {
  targetQueryId?: string | null
}

type GetTargetsQueriesResponse = TargetQuery

/**
 * @interface TargetQuery
 * @param {string} title 쿼리 제목
 * @param {string | null} jiraTicketLink 요청 지라 티켓 링크
 * @param {string | null} description 쿼리 상세 설명
 * @param {string} query 쿼리
 * @param {number} id 아이디
 * @param {string} queryId 쿼리 아이디
 * @param {Author} author 작성자 정보
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 */
export interface TargetQuery {
  title: string
  jiraTicketLink: string | null
  description: string | null
  query: string
  id: number
  queryId: string
  lastCalculatedAt: string | null
  calculatedCount: string | null
  status: string | null
  author: Author
  createdAt: string
  updatedAt: string
}
