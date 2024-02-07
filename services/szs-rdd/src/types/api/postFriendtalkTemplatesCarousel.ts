import { SendProfile } from '~/constants'
import { CarouselItem, CarouselTail } from '~/friendtalk/types'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/friendtalk/templates (친구톡 CAROUSEL 템플릿 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_carousel_template_api_v1_friendtalk_templates_carousel_post
 */

export type Request = PostFriendtalkTemplateCarouselRequest
export type Response = {}

/**
 * @interface PostFriendtalkTemplateCarouselRequest
 * @param {SendProfile} sendProfile 발송 프로필
 * @param {string} templateCode 템플릿 코드
 * @param {string} description 메시지 이름
 * @param {FriendtalkTemplateType} templateType 템플릿 타입
 * @param {string[]} requestParameter 템플릿 요청 파라미터
 * @param {ParameterMap} autoFillParameter 템플릿 자동치환 파라미터 대체 값
 */
export interface PostFriendtalkTemplateCarouselRequest {
  sendProfile: SendProfile
  templateCode: string
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  items: CarouselItem[]
  carouselTail: CarouselTail
}
