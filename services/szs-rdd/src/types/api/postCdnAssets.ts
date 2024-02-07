import { CdnAssetGroup } from '~/constants'

/**
 * @see Swagger POST /api/v1/cdn/assets (cdn asset 등록)
 * https://rdd-internal.dev.jobis.co/docs#/cdn%20asset%20%EA%B4%80%EB%A6%AC/create_cdn_asset_api_v1_cdn_assets_post
 */

export type Request = PostCdnAssetsRequest
export type Response = PostCdnAssetsResponse

export interface PostCdnAssetsRequest {
  body: FormData
  assetGroup: CdnAssetGroup
}

export interface PostCdnAssetsResponse {
  id: string
  contentType: string
  fullAssetUrl: string
}
