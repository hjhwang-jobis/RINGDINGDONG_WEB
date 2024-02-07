import {
  SendProfile,
  SendTestMessagePriority,
  SendTestMessageTagType,
} from '~/constants'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/alimtalk/send (알림톡 단건 발송)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_alimtalk_api_v1_alimtalk_send_post
 */

export type Request = PostAlimtalkSendRequest
export type Response = {}

/**
 * @interface PostAlimtalkSendRequest 알림톡 전송
 * @param {SendTestMessageTagType} tag
 * @param {string} templateCode
 * @param {SendProfile} sendProfile
 * @param {number} userId
 * @param {ParameterMap} parameterMap
 * @param {ParameterMap} autoFillParameter
 * @param {SendTestMessagePriority} priority
 * @param {boolean} containsAlimlist
 * @see Swagger - AlimtalkSendRequest
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_alimtalk_api_v1_alimtalk_send_post
 */
export interface PostAlimtalkSendRequest {
  tag?: SendTestMessageTagType
  templateCode: string
  sendProfile?: SendProfile
  userId: number
  parameterMap: ParameterMap
  autoFillParameter: ParameterMap
  priority: SendTestMessagePriority
  containsAlimlist?: boolean
}
