import { MessageGroupTemplateRequestBody } from '~/types'

/**
 * @see Swagger PUT /api/v1/messageGroups/activate/{messageGroupId} 메시지그룹 활성화
 * https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/activate_message_group_api_v1_messageGroups_activate__messageGroupId__put
 */

export type Request = PutMessageGroupsActivateRequest
export type Response = {}

/**
 * @interface PutCampaignsRequest
 * @param {number} messageGroupId 메시지그룹 아이디
 * @param {string} sendingRequestAt 발송요청일시
 * @param {MessageGroupTemplateRequestBody[]} messageGroupTemplates 소재 목록
 */
export interface PutMessageGroupsActivateRequest {
  messageGroupId: number
  sendingRequestAt: string
  messageGroupTemplates: MessageGroupTemplateRequestBody[]
}
