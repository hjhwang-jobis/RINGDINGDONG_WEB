import { ParameterMap } from '~/types'
import { GetPushTemplates, Pagination } from '~/types/api'

/**
 * @interface PushTemplateTableRow
 * @param {boolean} isChecked - 체크박스의 체크여부
 */
export interface PushTemplateTableRow extends GetPushTemplates.PushTemplate {
  isChecked: boolean
  createdAt: string // TODO GetPushTemplates.Response에는 없는 컬럼입니다. 확인 필요!
}

/**
 * @interface PushTemplateData
 * @param {PushTemplateTableRow[]} data - PushTemplateTableRow 배열
 * @param {Pagination} pagination - 페이지네이션 정보
 */
export interface PushTemplateData {
  data: PushTemplateTableRow[]
  pagination: Pagination
}

export interface FormPushTemplate {
  templateCode: string
  title: string
  body: string
  imageUrl: string
  link: string
  autoFillParameter: ParameterMap
  requestParameter: string[]
}
