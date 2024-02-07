/**
 * @see Swagger PUT /api/v1/actions (액션 수정)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/update_action_api_v1_actions__actionId__put
 */

export type Request = PutActionsRequest
export type Response = {}

/**
 * @interface PutActionsRequest
 * @param {number} actionId action 아이디
 * @param {string} name 액션 이름
 * @param {string} description 액션 설명
 */
export interface PutActionsRequest {
  actionId: number
  name: string
  description: string
}
