import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/push/templates (푸시 템플릿 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_push_template_api_v1_push_templates_post
 */

export type Request = PushTemplateRequest
export type Response = {}

/**
 * @interface PushTemplateRequest
 * @param {string} templateCode 템플릿 코드
 * @param {string} title 타이틀
 * @param {string} body 바디
 * @param {string} imageUrl 이미지 링크
 * @param {string} link 이동 링크
 * @param {string[]} requestParameter 이동 링크
 * @param {AutoFillParameter} autoFillParameter 지동정보치환맵. 현재는 개인정보치환만 한다. NAME만 지원한다. 홈택스 조회를 안한사람들이 대상. 이 경우 기본값을 써야하므로 맵형태로 키와 기본값을 관리함.
 * @see Swagger - 푸시 템플릿 등록 요청
 * https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_push_template_api_v1_push_templates_post
 */
export interface PushTemplateRequest {
  templateCode: string
  title: string
  body: string
  imageUrl: string
  link: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
}
