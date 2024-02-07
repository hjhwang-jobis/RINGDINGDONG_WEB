import { ParameterMap } from '~/types'

/**
 * @see Swagger GET /api/v1/push/templates/{template_code} (푸쉬 템플릿 상세 조회)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%EB%A9%94%EC%84%B8%EC%A7%80%20%EA%B4%80%EB%A6%AC/get_push_templates_api_v1_push_templates_get
 */
export type Request = GetPushTemplatesRequest
export type Response = PushTemplate

interface GetPushTemplatesRequest {
  templateCode: string
}

export interface PushTemplate {
  id: number
  createdAt: string
  updatedAt: string
  templateCode: string
  title: string
  body: string
  imageUrl: string
  data: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
}
