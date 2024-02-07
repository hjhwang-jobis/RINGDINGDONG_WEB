import { SendProfile } from '~/constants'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import { FriendtalkButton, FriendtalkCouponButton } from '~/friendtalk/types'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/friendtalk/templates/base (친구톡 BASE/WIDE 템플릿 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_template_api_v1_friendtalk_templates_post
 */

export type Request = PostFriendtalkTemplateBaseRequest
export type Response = {}

/**
 * @interface PostFriendtalkTemplateBaseRequest
 * @param {SendProfile} sendProfile 발송 프로필
 * @param {string} templateCode 템플릿 코드
 * @param {string} description 메시지 이름
 * @param {FriendtalkTemplateType} templateType 템플릿 타입
 * @param {string[]} requestParameter 템플릿 요청 파라미터
 * @param {ParameterMap} autoFillParameter 템플릿 자동치환 파라미터 대체 값
 * @param {BaseAndWideImageItem} item 템플릿 자동치환 파라미터 대체 값
 * @param {boolean} wide 템플릿 자동치환 파라미터 대체 값
 */
export interface PostFriendtalkTemplateBaseRequest {
  sendProfile: SendProfile
  templateCode: string
  templateType: FriendtalkTemplateType
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  item: BaseAndWideImageItem
  wide: boolean
}

/**
 * @interface BaseAndWideImageItem
 * @param {number} imageId 이미지 아이디
 * @param {string} imageLink 이미지 링크
 * @param {string} comment 홍보 문구
 * @param {string[]} buttons 버튼 목록
 * @param {FriendtalkCouponButton | null} couponButton 쿠폰 버튼
 */
export interface BaseAndWideImageItem {
  imageId: number
  imageLink: string | null
  comment: string
  buttons: FriendtalkButton[]
  couponButton?: FriendtalkCouponButton | null
}
