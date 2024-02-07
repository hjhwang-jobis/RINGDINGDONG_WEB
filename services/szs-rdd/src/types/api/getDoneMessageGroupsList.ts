import { MessageChannelType, SendProfile } from '~/constants'

/**
 * @see Swagger GET /api/v1/targets
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/get_targets_api_v1_targets_get
 */

export type Request = GetDoneMessageGroupsListRequest
export type Response = GetDoneMessageGroupsListResponse

/**
 * @interface Campaign
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} name 이름
 * @param {number} actionId 액션 아이디
 * @param {number} targetId 타겟 아이디
 * @param {MessageChannelType} messageChannel 발송 채널
 * @param {SendProfile} sendProfile 발신 프로필
 */
interface Campaign {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  actionId: number
  targetId: number
  messageChannel: MessageChannelType
  sendProfile: SendProfile
}

/**
 * @interface MessageGroup
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} name 메시지 그룹 이름
 * @param {Campaign} campaign 캠페인
 */
export interface MessageGroup {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  campaign: Campaign
}

/**
 * @interface GetDoneMessageGroupsListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 */
interface GetDoneMessageGroupsListRequest {
  pageSize: number
  pageNo: number
}

/**
 * @interface GetDoneMessageGroupsListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {MessageGroup[]} contents
 */
interface GetDoneMessageGroupsListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: MessageGroup[]
}
