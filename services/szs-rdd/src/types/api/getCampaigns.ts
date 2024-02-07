import { Campaign } from '~/types'

/**
 * @see Swagger GET /api/v1/campaigns/{campaignId}
 * https://rdd-internal.dev.jobis.co/docs#/%EC%BA%A0%ED%8E%98%EC%9D%B8%20%EA%B4%80%EB%A6%AC/get_campaign_api_v1_campaigns__campaignId__get
 */

export type Request = GetCampaignsRequest
export type Response = GetCampaignsResponse
/**
 * @interface GetCampaignsRequest
 * @param {number} testerId 테스터 아이디
 */
export interface GetCampaignsRequest {
  campaignId: number
}

type GetCampaignsResponse = Campaign
