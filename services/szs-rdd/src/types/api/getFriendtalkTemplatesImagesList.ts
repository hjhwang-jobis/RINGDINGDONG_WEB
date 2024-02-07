import { SortDirection } from '~/constants'
import { FriendtalkTemplateType } from '~/friendtalk/constants'

import { FriendtalkTemplateImage } from './getFriendtalkTemplatesImages'

/**
 * @see Swagger GET /api/v1/friendtalks/templates/images/list
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_template_images_api_v1_friendtalk_templates_images_list_get
 */

export type Request = GetFriendtalkTemplatesImagesListRequest
export type Response = GetFriendtalkTemplatesImagesListResponse
/**
 * @interface GetFriendtalkTemplatesImagesListRequest
 * @param {number} pageSize 페이지 크기 (default: 20, max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} searchStartDate 검색 시작일자 (yyyy-MM-dd)
 * @param {string} searchEndDate 검색 종료일자 (yyyy-MM-dd)
 * @param {string} url 이미지 URL
 * @param {FriendtalkTemplateType} templateType 템플릿 타입
 * @param {string} originFileName 원본 파일명
 * @param {string} field 정렬하고 싶은 Field
 * @param {SortDirection} direction 정렬 방식(ASC, DESC)
 */
interface GetFriendtalkTemplatesImagesListRequest {
  pageSize: number
  pageNo: number
  searchStartDate?: string | null
  searchEndDate?: string | null
  url?: string | null
  templateType?: FriendtalkTemplateType | null
  originFileName?: string | null
  field?: string | null
  direction: SortDirection
}

/**
 * @interface GetFriendtalkTemplatesImagesListResponse
 * @param {number} totalPage
 * @param {number} totalElements
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {FriendtalkTemplateImage[]} contents
 */
interface GetFriendtalkTemplatesImagesListResponse {
  totalPage: number
  totalElements: number
  pageSize: number
  pageNo: number
  contents: FriendtalkTemplateImage[]
}
