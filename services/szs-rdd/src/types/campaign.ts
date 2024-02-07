import { MessageChannelType, SendProfile } from '~/constants'
import { Author } from '~/types'
import { MessageGroup } from '~/types'

export interface Target {
  id: number
  createdAt: string
  updatedAt: string
  targetId: string
  title: string
}

export interface Action {
  id: number
  createdAt: string
  updatedAt: string
  name: string
}

/**
 * @interface Campaign
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} name 이름
 * @param {number} actionId 액션 아이디
 * @param {Target} target 타겟 정보
 * @param {MessageChannelType} messageChannel 발송 채널
 * @param {SendProfile} sendProfile 발신 프로필
 * @param {integer | null} requestedCount 발송요청건수
 * @param {integer | null} sentCount 발송건수
 * @param {integer | null} failedCount 발송실패건수
 * @param {integer | null} succeedCount 수신건수
 * @param {Author} author 작성자 정보
 * @param {MessageGroup[]} messageGroups 메시지 그룹 정보
 */
export interface Campaign {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  actionId: number
  action: Action
  target: Target
  messageChannel: MessageChannelType
  sendProfile: SendProfile
  author: Author
  requestedCount?: number | null
  sentCount?: number | null
  failedCount?: number | null
  succeedCount?: number | null
  messageGroups: MessageGroup[]
}
