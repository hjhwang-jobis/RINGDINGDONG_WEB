export const CAROUSEL_MAX_CNT = 6
export const CAROUSEL_MIN_CNT = 2

export const FriendtalkTemplateType = {
  BASE: 'BASE',
  WIDE_IMAGE: 'WIDE_IMAGE',
  WIDE_LIST: 'WIDE_LIST',
  CAROUSEL: 'CAROUSEL',
} as const
export type FriendtalkTemplateType =
  (typeof FriendtalkTemplateType)[keyof typeof FriendtalkTemplateType]

export const FRIENDTALK_TEMPLATE_TYPE_NAME = {
  기본텍스트: '기본텍스트',
  와이드이미지: '와이드이미지',
  와이드리스트: '와이드리스트',
  캐러셀: '캐러셀',
} as const

export const FriendtalkTemplateTypeMap = {
  [FriendtalkTemplateType.BASE]: FRIENDTALK_TEMPLATE_TYPE_NAME.기본텍스트,
  [FriendtalkTemplateType.WIDE_IMAGE]:
    FRIENDTALK_TEMPLATE_TYPE_NAME.와이드이미지,
  [FriendtalkTemplateType.WIDE_LIST]:
    FRIENDTALK_TEMPLATE_TYPE_NAME.와이드리스트,
  [FriendtalkTemplateType.CAROUSEL]: FRIENDTALK_TEMPLATE_TYPE_NAME.캐러셀,
}

export const FriendtalkButtonType = {
  WL: 'WL',
  AL: 'AL',
  DS: 'DS',
  BK: 'BK',
  MD: 'MD',
  BC: 'BC',
  BT: 'BT',
  AC: 'AC',
} as const
export type FriendtalkButtonType =
  (typeof FriendtalkButtonType)[keyof typeof FriendtalkButtonType]

export const FriendtalkButtonTarget = {
  OUT: 'OUT',
  IN: 'IN',
}
export type FriendtalkButtonTarget =
  (typeof FriendtalkButtonTarget)[keyof typeof FriendtalkButtonTarget]
