import { Author, Campaign } from '~/types'

/**
 * @see Swagger GET /api/v1/actions/{actionId} 액션 상세 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/get_action_api_v1_actions__actionId__get
 */

export type Request = GetActionsRequest
export type Response = GetActionsResponse

/**
 * @interface GetActionsRequest
 * @param {number} actionId action 아이디
 */
interface GetActionsRequest {
  actionId: number
}

type GetActionsResponse = Action

/**
 * @interface Action
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} name 액션 이름
 * @param {string} description 액션 설명
 * @param {Author} author
 * @param {Campaign[]} campaigns
 */
export interface Action {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  author: Author
  campaigns: Campaign[]
}
