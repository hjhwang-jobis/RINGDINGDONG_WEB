import { ParameterType } from '~/alimtalk/constants'
import { AlimtalkChannelType } from '~/constants'

/**
 * @see Swagger POST /api/v1/alimtalk/activate (알림톡 템플릿 활성화)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/activate_alimtalk_template_api_v1_alimtalk_activate__templateCode__post
 */

export type Request = PostAlimtalkActivateRequest
export type Response = {}

/**
 * @interface PostAlimtalkActivateRequest 알림톡 템플릿 활성화
 * @param {string} templateCode
 * @param {AlimtalkChannelType} profile
 * @param {AlimtalkMatchDetail[]} alimtalkMatchDetails
 */
export interface PostAlimtalkActivateRequest {
  templateCode: string
  profile: AlimtalkChannelType
  alimtalkMatchDetails: AlimtalkMatchDetail[]
}

/**
 * @interface AlimtalkMatchDetail 알림톡 자동치환자 정보
 * @param {ParameterType} parameterType
 * @param {string} originParameter 기존 템플릿에서 사용중인 파라미터명 (matches ^\#\{.*\}$)
 * @param {string} matchedParameter 매칭할 파라미터명 (matches ^\#\{[A-Z0-9_]{1,30}\}$)
 * @param {string} defaultValue 기본값, PERSONAL 타입에서만 사용
 */
interface AlimtalkMatchDetail {
  parameterType: ParameterType
  originParameter: string
  matchedParameter: string
  defaultValue: string
}
