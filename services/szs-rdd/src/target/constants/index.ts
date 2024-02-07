export const TargetFrequencyChannelType = {
  PUSH: 'PUSH',
  ALIMTALK: 'ALIMTALK',
  FRIENDTALK: 'FRIENDTALK',
  ALIMLIST: 'ALIMLIST',
}
export type TargetFrequencyChannelType =
  (typeof TargetFrequencyChannelType)[keyof typeof TargetFrequencyChannelType]
export const TargetFrequencyChannelTypeMap = {
  [TargetFrequencyChannelType.PUSH]: '푸시',
  [TargetFrequencyChannelType.ALIMTALK]: '알림톡',
  [TargetFrequencyChannelType.FRIENDTALK]: '친구톡',
  [TargetFrequencyChannelType.ALIMLIST]: '알림리스트',
}
