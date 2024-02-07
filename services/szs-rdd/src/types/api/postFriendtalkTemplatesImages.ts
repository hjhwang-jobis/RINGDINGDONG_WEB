import { FriendtalkTemplateType } from '~/friendtalk/constants'

/**
 * @see Swagger POST /api/v1/friendtalk/templates/images (친구톡 템플릿 이미지 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/create_friendtalk_template_image_api_v1_friendtalk_templates_images_post
 */

export type Request = PostFriendtalkTemplatesImagesRequest
export type Response = PostFriendtalkTemplatesImagesResponse

export interface PostFriendtalkTemplatesImagesRequest {
  body: FormData
  type: FriendtalkTemplateType
}

export interface PostFriendtalkTemplatesImagesResponse {
  id: number
  url: string
}
