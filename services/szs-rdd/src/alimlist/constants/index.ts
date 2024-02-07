import { createOption } from '~/components/SelectBox'

export const AlimlistTemplateButtonRequestLandingStyleType = {
  PUSH: 'PUSH',
  DEEPLINK: 'DEEPLINK',
  BROWSER: 'BROWSER',
} as const
export type AlimlistTemplateButtonRequestLandingStyleType =
  (typeof AlimlistTemplateButtonRequestLandingStyleType)[keyof typeof AlimlistTemplateButtonRequestLandingStyleType]

export const AlimlistTemplateButtonRequestLandingStyleTypeMap = {
  [AlimlistTemplateButtonRequestLandingStyleType.PUSH]: '푸시',
  [AlimlistTemplateButtonRequestLandingStyleType.DEEPLINK]: '딥링크',
  [AlimlistTemplateButtonRequestLandingStyleType.BROWSER]: '브라우저',
} as const
export const AlimlistTemplateButtonRequestLandingStyleTypeOptions = [
  createOption(
    AlimlistTemplateButtonRequestLandingStyleTypeMap[
      AlimlistTemplateButtonRequestLandingStyleType.PUSH
    ],
    AlimlistTemplateButtonRequestLandingStyleType.PUSH
  ),
  createOption(
    AlimlistTemplateButtonRequestLandingStyleTypeMap[
      AlimlistTemplateButtonRequestLandingStyleType.DEEPLINK
    ],
    AlimlistTemplateButtonRequestLandingStyleType.DEEPLINK
  ),
  createOption(
    AlimlistTemplateButtonRequestLandingStyleTypeMap[
      AlimlistTemplateButtonRequestLandingStyleType.BROWSER
    ],
    AlimlistTemplateButtonRequestLandingStyleType.BROWSER
  ),
]

export const AlimlistTemplateButtonRequestLandingType = {
  WEB: 'WEB',
  NATIVE: 'NATIVE',
} as const
export type AlimlistTemplateButtonRequestLandingType =
  (typeof AlimlistTemplateButtonRequestLandingType)[keyof typeof AlimlistTemplateButtonRequestLandingType]
export const AlimlistTemplateButtonRequestLandingTypeMap = {
  [AlimlistTemplateButtonRequestLandingType.NATIVE]: '네이티브',
  [AlimlistTemplateButtonRequestLandingType.WEB]: '웹',
} as const
export const AlimlistTemplateButtonRequestLandingTypeOptions = [
  createOption(
    AlimlistTemplateButtonRequestLandingTypeMap[
      AlimlistTemplateButtonRequestLandingType.WEB
    ],
    AlimlistTemplateButtonRequestLandingType.WEB
  ),
  createOption(
    AlimlistTemplateButtonRequestLandingTypeMap[
      AlimlistTemplateButtonRequestLandingType.NATIVE
    ],
    AlimlistTemplateButtonRequestLandingType.NATIVE
  ),
]

export const AlimlistTemplateNotificationType = {
  TEXT_BUTTON: 'C',
  TEXT_IMAGE_BUTTON: 'E',
} as const
export type AlimlistTemplateNotificationType =
  (typeof AlimlistTemplateNotificationType)[keyof typeof AlimlistTemplateNotificationType]
export const AlimlistTemplateNotificationTypeMap = {
  [AlimlistTemplateNotificationType.TEXT_BUTTON]: '텍스트/버튼',
  [AlimlistTemplateNotificationType.TEXT_IMAGE_BUTTON]: '텍스트/이미지/버튼',
} as const
export const AlimlistTemplateNotificationTypeOptions = [
  createOption(
    AlimlistTemplateNotificationTypeMap[
      AlimlistTemplateNotificationType.TEXT_BUTTON
    ],
    AlimlistTemplateNotificationType.TEXT_BUTTON
  ),
  createOption(
    AlimlistTemplateNotificationTypeMap[
      AlimlistTemplateNotificationType.TEXT_IMAGE_BUTTON
    ],
    AlimlistTemplateNotificationType.TEXT_IMAGE_BUTTON
  ),
]
