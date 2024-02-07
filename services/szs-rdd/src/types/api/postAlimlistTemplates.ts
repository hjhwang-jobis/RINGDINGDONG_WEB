import {
  AlimlistTemplateButtonRequestLandingStyleType,
  AlimlistTemplateButtonRequestLandingType,
} from '~/alimlist/constants'
import { AlimlistTemplateNotificationType } from '~/alimlist/constants'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/alimlist/templates (알림리스트 템플릿 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_alimlist_template_api_v1_alimlist_templates_post
 */

export type Request = PostAlimlistTemplatesRequest
export type Response = {}

/**
 * @interface PostAlimlistTemplatesRequest
 * @param {string} templateCode 템플릿 코드
 * @param {string} title 컨텐츠 제목
 * @param {string} subTitle 컨텐츠 소제목
 * @param {string} detail 컨텐츠 내용
 * @param {string} imageUrl 이미지 cdn url
 * @param {string[]} buttonRequests 버튼 정보
 * @param {string[]} requestParameter 템플릿 요청 파라미터
 * @param {ParameterMap} autoFillParameter 지동정보치환맵. 현재는 개인정보치환만 한다. NAME만 지원한다. 홈택스 조회를 안한사람들이 대상. 이 경우 기본값을 써야하므로 맵형태로 키와 기본값을 관리함.
 */
export interface PostAlimlistTemplatesRequest {
  templateCode: string
  title: string
  subTitle: string
  detail?: string
  imageUrl: string
  buttonRequests: AlimlistTemplateButtonRequest[]
  notificationType: AlimlistTemplateNotificationType
  requestParameter: string[]
  autoFillParameter: ParameterMap
}

/**
 * @interface AlimlistTemplateButtonRequest
 * @param {string} landingUrl 랜딩 url
 * @param {AlimlistTemplateButtonRequestLandingStyleType} landingStyle 랜딩 스타일 PUSH|DEEPLINK|BROWSER
 * @param {AlimlistTemplateButtonRequestLandingType} landingType 랜딩 타입 WEB|NATIVE
 * @param {string} description 버튼 문구
 * @param {string} contentIds 랜딩될 컨텐츠 아이디
 */
export interface AlimlistTemplateButtonRequest {
  landingUrl: string
  landingStyle: AlimlistTemplateButtonRequestLandingStyleType
  landingType: AlimlistTemplateButtonRequestLandingType
  description: string
  contentIds: string
}
