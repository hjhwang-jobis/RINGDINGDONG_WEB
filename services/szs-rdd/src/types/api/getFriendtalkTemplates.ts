import { FriendtalkTemplateType } from '~/friendtalk/constants'
import { ParameterMap } from '~/types'

/**
 * @see Swagger GET /api/v1/friendtalks/templates/{template_code}
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_template_api_v1_friendtalk_templates__template_code__get
 */

export type Request = GetFriendtalkTemplateRequest
export type Response = GetFriendtalkTemplateResponse

interface GetFriendtalkTemplateRequest {
  templateCode: string
}

type GetFriendtalkTemplateResponse = FriendtalkTemplate

/**
 * @interface FriendtalkTemplate
 * @param {number} id
 * @param {string} createdAt
 * @param {string} updatedAt
 * @param {string} templateCode
 * @param {FriendtalkTemplateType} templateType
 * @param {string} content
 * @param {string[]} requestParameter
 * @param {ParameterMap} autoFillParameter 템플릿 자동치환 파라미터 대체 값
 * @param {boolean} advertisement
 * @param {string} sendProfile
 * @param {string} description
 */
export interface FriendtalkTemplate {
  id: number
  createdAt: string
  updatedAt: string
  templateCode: string
  templateType: FriendtalkTemplateType
  content: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  advertisement: boolean
  sendProfile: string
  description: string
}
