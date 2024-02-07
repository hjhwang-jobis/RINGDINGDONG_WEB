import { ParameterType } from '~/alimtalk/constants'
import { AlimtalkChannelType } from '~/constants'
import { Author } from '~/types'

/**
 * @see Swagger GET /api/v1/alimtalk/templates/matchedParameters/{templateCode} 알림톡 템플릿 파라미터 매칭 정보 조회. 파라미터 치환, 테스트 발송, 메시지 그룹 소재 설정시 사용
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_template_matched_parameters_api_v1_alimtalk_templates_matchedParameters__templateCode__get
 */

export type Request = GetAlimtalkTemplatesMatchedParametersRequest

/**
 * @interface GetAlimtalkTemplatesMatchedParametersRequest
 * @param {string} templateCode - 템플릿 코드
 * @param {AlimtalkChannelType} profile - 발신 프로필
 */
export interface GetAlimtalkTemplatesMatchedParametersRequest {
  templateCode: string
  profile: AlimtalkChannelType
}

/**
 * @interface Response
 * @param {number} id
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {Author} author 작성자 정보
 * @param {AlimtalkMatchedParameterInfo[]} matchedInfos 작성자 정보
 */
export interface Response {
  id: number
  createdAt: string
  updatedAt: string
  author: Author
  matchedInfos: AlimtalkMatchedParameterInfo[]
}

/**
 * @interface AlimtalkMatchedParameterInfo
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {ParameterType} parameterType 파라미터 타입("BASIC", "AUTO", "PERSONAL")
 * @param {string} originParameter 실제 파라미터 명
 * @param {string} matchedParameter 매칭되어 있는 파라미터 명
 */
export interface AlimtalkMatchedParameterInfo {
  id: number
  createdAt: string
  updatedAt: string
  parameterType: ParameterType
  originParameter: string
  matchedParameter: string
}
