import {
  MessageChannelType,
  MessageGroupSendStatusType,
  MessageGroupTemplateSendStatusType,
} from '~/constants'

export interface Action {
  id: number
  createdAt: string
  updatedAt: string
  name: string
}

export interface Campaign {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  action: Action
}

/**
 * @interface MessageGroup
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} name 메시지 그룹 이름
 * @param {number} partitionFrom 분할 시작 위치
 * @param {number} partitionTo 분할 종료 위치
 * @param {MessageGroupSendStatusType} sendStatus 발송 상태
 * @param {boolean} isActive 활성화 여부
 * @param {string | null} sendingRequestAt 발송요청일시
 * @param {integer | null} requestedCount 발송요청건수
 * @param {integer | null} sentCount 발송건수
 * @param {integer | null} failedCount 발송실패건수
 * @param {integer | null} succeedCount 수신건수
 * @param {MessageGroupTemplate} messageGroupTemplates 소재 목록
 */
export interface MessageGroup {
  id: number
  createdAt: string
  updatedAt: string
  campaign: Campaign
  name: string
  partitionFrom: number
  partitionTo: number
  sendStatus: MessageGroupSendStatusType
  isActive: boolean
  sendingRequestAt?: string | null
  requestedCount?: number | null
  sentCount?: number | null
  failedCount?: number | null
  succeedCount?: number | null
  messageGroupTemplates?: MessageGroupTemplate[]
}

/**
 * @interface MessageGroupTemplate
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {MessageChannelType} messageChannel 발송 채널
 * @param {string} templateCode 템플릿 코드
 * @param {string} hermesTag 헤르메스 태그
 * @param {string} parameters 파라미터 값, json string 형태
 * @param {MessageGroupTemplateSendStatusType} sendStatus 발송 상태
 * @param {integer | null} requestedCount 발송요청건수
 * @param {integer | null} sentCount 발송건수
 * @param {integer | null} failedCount 발송실패건수
 * @param {integer | null} succeedCount 수신건수
 * @param {string | null} sendStartedAt 발송시작시점
 * @param {string | null} sendFinishedAt 발송종료시점
 * @param {boolean} isContainAlimlist 알림리스트 동시 발송 여부
 */
export interface MessageGroupTemplate {
  id: number
  createdAt: string
  updatedAt: string
  messageChannel: MessageChannelType
  templateCode: string
  hermesTag: string | null
  parameters: string
  sendStatus: MessageGroupTemplateSendStatusType
  requestedCount?: number | null
  sentCount?: number | null
  failedCount?: number | null
  succeedCount?: number | null
  isContainAlimlist: boolean
  sendStartedAt: string | null
  sendFinishedAt: string | null
}

/**
 * @interface MessageGroupTemplateRequestBody
 * @param {MessageChannelType} messageChannel 발송 채널
 * @param {string} templateCode 템플릿 코드
 * @param {string} parameters 파라미터 값, json string 형태
 * @param {boolean} isContainAlimlist 알림리스트 동시 발송 여부
 */
export interface MessageGroupTemplateRequestBody {
  messageChannel: MessageChannelType
  templateCode: string
  parameters: string
  isContainAlimlist: boolean
}
