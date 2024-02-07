import { AlimtalkChannelType } from '~/constants'

/**
 * @see Swagger GET /api/v1/alimtalk/templates/parameters/{templateCode} 알림톡 템플릿 파라미터 목록 조회. 활성화시 사용
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_template_parameters_api_v1_alimtalk_templates_parameters__templateCode__get
 */

export type Request = GetAlimtalkTemplatesParametersRequest

/**
 * @interface GetAlimtalkTemplatesParametersRequest
 * @param {string} templateCode - 템플릿 코드
 * @param {AlimtalkChannelType} profile - 발신 프로필
 */
export interface GetAlimtalkTemplatesParametersRequest {
  templateCode: string
  profile: AlimtalkChannelType
}

/**
 * @interface Response
 * @param {string[]} parameters
 */
export interface Response {
  parameters: string[]
}
