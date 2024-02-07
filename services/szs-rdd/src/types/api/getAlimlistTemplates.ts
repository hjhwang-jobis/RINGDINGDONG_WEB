import { AlimlistTemplateNotificationType } from '~/alimlist/constants'
import { ParameterMap } from '~/types'

export type Request = GetAlimlistTemplatesRequest
export type Response = GetAlimlistTemplatesResponse

/**
 * @interface GetAlimlistTemplatesRequest
 * @param {string} templateCode - 템플릿 코드
 * @see Swagger - 알림리스트 상세 조회
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimlist_template_api_v1_alimlist_templates__template_code__get
 * @url GET /api/v1/Alimlist/templates/{template_code}
 */
interface GetAlimlistTemplatesRequest {
  templateCode: string
}

type GetAlimlistTemplatesResponse = AlimlistTemplate

/**
 * @interface AlimlistTemplate
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} templateCode 템플릿 코드
 * @param {string} title 컨텐츠 제목
 * @param {string} subTitle 컨텐츠 소제목
 * @param {string} detail 컨텐츠 내용
 * @param {string} imageUrl 이미지 cdn url
 * @param {AlimlistTemplateNotificationType} notificationType 알림리스트 타입
 * @param {string} button 버튼 정보
 * @param {string[]} requestParameter 템플릿 요청 파라미터
 * @param {ParameterMap} autoFillParameter 지동정보치환맵. 현재는 개인정보치환만 한다. NAME만 지원한다. 홈택스 조회를 안한사람들이 대상. 이 경우 기본값을 써야하므로 맵형태로 키와 기본값을 관리함.
 */
export interface AlimlistTemplate {
  id: number
  createdAt: string
  updatedAt: string
  templateCode: string
  title: string
  subTitle: string
  detail: string
  imageUrl: string
  notificationType: AlimlistTemplateNotificationType
  button: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
}
