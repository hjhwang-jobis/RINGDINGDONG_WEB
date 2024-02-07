import { CdnAssetGroup } from '~/constants'

/**
 * @see Swagger GET /api/v1/cdn/assets/list
 * https://rdd-internal.dev.jobis.co/docs#/cdn%20asset%20%EA%B4%80%EB%A6%AC/get_cdn_assets_api_v1_cdn_assets_list_get
 */

export type Request = GetCdnAssetsListRequest
export type Response = GetCdnAssetsListResponse
/**
 * @interface GetCdnAssetsListRequest
 * @param {CdnAssetGroup} assetGroup 그룹명
 * @param {number} pageSize 페이지 크기
 * @param {number} pageNo 페이지 번호
 */
export interface GetCdnAssetsListRequest {
  assetGroup: CdnAssetGroup
  pageSize: number
  pageNo: number
}

/**
 * @interface GetCdnAssetsListResponse
 * @param {number} pageSize
 * @param {number} pageNo
 * @param {number} totalElements
 * @param {number} totalPage
 * @param {CdnAsset[]} contents
 */
interface GetCdnAssetsListResponse {
  pageSize: number
  pageNo: number
  totalElements: number
  totalPage: number
  contents: CdnAsset[]
}

export interface CdnAsset {
  assetId: string
  path: string
  contentType: string
  originName: string
  assetGroup: CdnAssetGroup
  createdAt: string
  updatedAt: string
  deletedAt: string
  fullAssetUrl: string
}
