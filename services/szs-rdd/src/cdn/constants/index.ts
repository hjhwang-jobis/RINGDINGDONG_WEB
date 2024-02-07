import { CdnAssetGroup, CdnAssetGroupMap } from '~/constants'

export const RADIO_OPTION_LIST_CDN_ASSET_GROUP_FOR_UPLOAD = [
  {
    label: CdnAssetGroupMap[CdnAssetGroup.Push],
    value: CdnAssetGroup.Push,
  },
  {
    label: CdnAssetGroupMap[CdnAssetGroup.AlimList],
    value: CdnAssetGroup.AlimList,
  },
]

export const RADIO_OPTION_LIST_CDN_ASSET_GROUP = [
  {
    label: CdnAssetGroupMap[CdnAssetGroup.AlimTalk],
    value: CdnAssetGroup.AlimTalk,
  },
  ...RADIO_OPTION_LIST_CDN_ASSET_GROUP_FOR_UPLOAD,
]
