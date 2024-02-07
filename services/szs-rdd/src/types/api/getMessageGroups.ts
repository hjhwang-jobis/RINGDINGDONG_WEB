import { MessageGroup } from '~/types'

/**
 * @see Swagger GET /api/v1/messageGroups/{messageGroupId}
 * https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/get_message_group_api_v1_messageGroups__messageGroupId__get
 */

export type Request = GetMessageGroupsRequest
export type Response = GetMessageGroupsResponse
/**
 * @interface GetCampaignsRequest
 * @param {number} messageGroupId 테스터 아이디
 */
export interface GetMessageGroupsRequest {
  messageGroupId: number
}

type GetMessageGroupsResponse = MessageGroup
