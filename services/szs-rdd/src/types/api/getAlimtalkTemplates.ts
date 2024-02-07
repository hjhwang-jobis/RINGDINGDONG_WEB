import {
  PlusFriendType,
  StatusType,
  TemplateEmphasizeType,
  TemplateMessageType,
} from '~/alimtalk/constants'
import { AlimtalkChannelType } from '~/constants'

/**
 * @see Swagger GET /api/v1/alimtalk/templates/{templateCode}?profile={profile}
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_template_api_v1_alimtalk_templates__templateCode__get
 */

export type Request = GetAlimtalkTemplatesRequest
export type Response = GetAlimtalkTemplatesResponse

/**
 * @interface GetAlimtalkTemplatesRequest
 * @param {string} templateCode - 템플릿 코드
 * @param {AlimtalkChannelType} profile - 발신 프로필
 * @see Swagger - 알림톡 템플릿 상세 조회
 */
export interface GetAlimtalkTemplatesRequest {
  templateCode: string
  profile: AlimtalkChannelType
}

export type GetAlimtalkTemplatesResponse = AlimtalkTemplate

/**
 * @interface AlimtalkTemplate 알림톡 템플릿 조회 응답
 * @param {boolean} active 활성화 여부
 * @param {string} channelId 등록된 채널 id
 * @param {string} templateCode 템플릿 코드
 * @param {string} name 템플릿 명
 * @param {string} content 템플릿 내용
 * @param {StatusType} status 템플릿 상태
 * @param {string} buttons 템플릿 버튼 (json)
 * @param {PlusFriendType} plusFriendType 플러스 친구 유형
 * @param {TemplateMessageType} templateMessageType 템플릿 메시지 유형
 * @param {TemplateEmphasizeType} templateEmphasizeType 템플릿 강조 표시 타입(NONE : 기본, TEXT : 강조 표시, IMAGE: 이미지형, default : NONE)
 * @param {string} templateExtra 템플릿 부가 정보
 * @param {string} templateAd 템플릿 내 수신 동의 요청 또는 간단한 광고 문구
 * @param {string} templateTitle 템플릿 제목
 * @param {string} templateSubtitle 템플릿 보조 문구
 * @param {string} templateImageName 이미지명(업로드한 파일명)
 * @param {string} templateImageUrl 이미지 URL
 * @param {string} deletedDateTime 템플릿 삭제 일시 (yyyy-MM-dd HH:mm:ss)
 * @param {string} createdDateTime 템플릿 생성 일시 (yyyy-MM-dd HH:mm:ss)
 * @param {string} updatedDateTime 템플릿 수정 일시 (yyyy-MM-dd HH:mm:ss)
 */
export interface AlimtalkTemplate {
  active: boolean
  channelId: string
  templateCode: string
  name: string
  content: string
  status: StatusType
  buttons: string
  plusFriendType: PlusFriendType
  templateMessageType: TemplateMessageType
  templateEmphasizeType: TemplateEmphasizeType
  templateExtra: string | null
  templateAd: string | null
  templateTitle: string | null
  templateSubtitle: string | null
  templateImageName: string | null
  templateImageUrl: string | null
  deletedDateTime: string | null
  createdDateTime: string | null
  updatedDateTime: string | null
  autoFillParameterDefaultValues: AutoFillParameterDefaultValue[]
}

export interface AutoFillParameterDefaultValue {
  key: string
  value: string
  type: string
}
