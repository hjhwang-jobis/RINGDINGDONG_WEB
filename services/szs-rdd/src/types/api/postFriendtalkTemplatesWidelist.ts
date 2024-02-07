import { SendProfile } from '~/constants'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import { WideListItem } from '~/friendtalk/types'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/friendtalk/templates/widelist (친구톡 WIDELIST 템플릿 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_widelist_template_api_v1_friendtalk_templates_widelist_post
 */

export type Request = PostFriendtalkTemplateWidelistRequest
export type Response = {}

/**
 * @interface PostFriendtalkTemplateWidelistRequest
 * @param {SendProfile} sendProfile 발송 프로필
 * @param {string} templateCode 템플릿 코드
 * @param {string} description 메시지 이름
 * @param {FriendtalkTemplateType} templateType 템플릿 타입
 * @param {string[]} requestParameter 템플릿 요청 파라미터
 * @param {ParameterMap} autoFillParameter 템플릿 자동치환 파라미터 대체 값
 * @param {WideListItem} item 아이템
 */
export interface PostFriendtalkTemplateWidelistRequest {
  sendProfile: SendProfile
  templateCode: string
  templateType: FriendtalkTemplateType
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  item: WideListItem
}
