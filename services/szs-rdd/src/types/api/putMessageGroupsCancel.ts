/**
 * @see Swagger PUT /api/v1/messageGroups/cancel/{messageGroupId} 메시지그룹 발송 취소
 * https://rdd-internal.dev.jobis.co/docs#/%EB%A9%94%EC%84%B8%EC%A7%80%EA%B7%B8%EB%A3%B9%20%EA%B4%80%EB%A6%AC/cancel_message_group_api_v1_messageGroups_cancel__messageGroupId__put
 */

export type Request = PutMessageGroupsCancelRequest
export type Response = {}

/**
 * @interface PutMessageGroupsCancelRequest
 * @param {number} messageGroupId 메시지그룹 아이디
 */
export interface PutMessageGroupsCancelRequest {
  messageGroupId: number
}
