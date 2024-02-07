import { MessageChannelType } from '~/constants'
import { MessageGroup } from '~/types'

/**
 * @see Swagger POST /api/v1/campaigns (액션 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%A1%EC%85%98%20%EA%B4%80%EB%A6%AC/create_action_api_v1_actions_post
 */

export type Request = PostCampaignsRequest
export type Response = {}

/**
 * @interface PostCampaignsRequest
 * @param {string} name 캠페인 이름
 * @param {MessageChannelType} messageChannel 발송 채널
 * @param {string} sendProfile 발신 프로필
 * @param {number} actionId 액션 아이디
 * @param {number} targetId 타겟 아이디
 * @param {MessageGroup[]} messageGroups 타겟 아이디
 */
export interface PostCampaignsRequest {
  name: string
  messageChannel: MessageChannelType
  sendProfile: string
  actionId: number
  targetId: number
  messageGroups: MessageGroup[]
}
