import { MessageChannelType, SendProfile } from '~/constants'
import { MessageGroup } from '~/types'

/**
 * @see Swagger PUT /api/v1/campaigns/{campaignId} 캠페인 수정
 * https://rdd-internal.dev.jobis.co/docs#/%EC%BA%A0%ED%8E%98%EC%9D%B8%20%EA%B4%80%EB%A6%AC/update_campaign_api_v1_campaigns__campaignId__put
 */

export type Request = PutCampaignsRequest
export type Response = {}

/**
 * @interface PutCampaignsRequest
 * @param {number} id 아이디
 * @param {string} name 캠페인 이름
 * @param {MessageChannelType} messageChannel 발송 채널
 * @param {SendProfile} sendProfile 발신 프로필
 * @param {number} actionId 액션 아이디
 * @param {number} targetId 타겟 아이디
 * @param {MessageGroup[]} messageGroups 타겟 아이디
 */
export interface PutCampaignsRequest {
  id: number
  name: string
  messageChannel: MessageChannelType
  sendProfile: SendProfile
  actionId: number
  targetId: number
  messageGroups: MessageGroup[]
}
