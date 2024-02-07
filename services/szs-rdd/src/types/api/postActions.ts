import { Action } from './getActions'

/**
 * @see Swagger POST /api/v1/actions (액션 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/create_action_api_v1_actions_post
 */

export type Request = PostActionsRequest
export type Response = PostActionsResponse

/**
 * @interface PostActionsRequest
 * @param {string} name 액션 이름
 * @param {string} description 액션 설명
 */
interface PostActionsRequest {
  name: string
  description: string
}

type PostActionsResponse = Action
