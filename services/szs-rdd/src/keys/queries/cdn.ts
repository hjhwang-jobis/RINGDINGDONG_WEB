import { GetCdnAssetsList } from '~/types/api'

const cdnAsset = {
  BASE: ['CDN_ASSET'],
  getCdnAssetsList: (params: GetCdnAssetsList.Request) => [
    ...cdnAsset.BASE,
    'getCdnAssetsList',
    params,
  ],
} as const

export default cdnAsset
