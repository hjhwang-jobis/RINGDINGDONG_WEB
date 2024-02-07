import { FriendtalkTemplateType } from '~/friendtalk/constants'

/**
 * @see Swagger GET /api/v1/friendtalks/templates/images/{image_id}
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_friendtalk_template_images_api_v1_friendtalk_templates_images_get
 */

export type Request = GetFriendtalkTemplatesImagesRequest
export type Response = GetFriendtalkTemplatesImagesResponse

interface GetFriendtalkTemplatesImagesRequest {
  imageId: number
}

type GetFriendtalkTemplatesImagesResponse = FriendtalkTemplateImage

/**
 * @interface FriendtalkTemplateImage
 * @param {number} id
 * @param {number} url
 * @param {string} createdAt
 * @param {string} updatedAt
 * @param {FriendtalkTemplateType} templateType
 * @param {string} originFileName
 */
export interface FriendtalkTemplateImage {
  id: number
  url: string
  createdAt: string
  updatedAt: string
  templateType: FriendtalkTemplateType
  originFileName: string
}
