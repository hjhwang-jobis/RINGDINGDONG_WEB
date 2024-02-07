import { createOption } from '~/components/SelectBox'

export const TemplateEmphasizeType = {
  NONE: 'NONE',
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
}
export type TemplateEmphasizeType =
  (typeof TemplateEmphasizeType)[keyof typeof TemplateEmphasizeType]
export const TemplateEmphasizeTypeMap = {
  [TemplateEmphasizeType.NONE]: '기본(NONE)',
  [TemplateEmphasizeType.TEXT]: '강조 표시(TEXT)',
  [TemplateEmphasizeType.IMAGE]: '이미지형(IMAGE)',
}

export const TemplateMessageType = {
  BA: 'BA',
  EX: 'EX',
}
export type TemplateMessageType =
  (typeof TemplateMessageType)[keyof typeof TemplateMessageType]
export const TemplateMessageTypeMap = {
  [TemplateMessageType.BA]: '일반(BA)',
  [TemplateMessageType.EX]: '특수(EX)',
}

export const StatusType = {
  TSC01: 'TSC01',
  TSC02: 'TSC02',
  TSC03: 'TSC03',
  TSC04: 'TSC04',
}
export type StatusType = (typeof StatusType)[keyof typeof StatusType]
export const StatusTypeMap = {
  [StatusType.TSC01]: '요청',
  [StatusType.TSC02]: '검수중',
  [StatusType.TSC03]: '승인',
  [StatusType.TSC04]: '반려',
}

export const PlusFriendType = {
  NORMAL: 'NORMAL',
  GROUP: 'GROUP',
}
export type PlusFriendType =
  (typeof PlusFriendType)[keyof typeof PlusFriendType]
export const PlusFriendTypeMap = {
  [PlusFriendType.NORMAL]: '일반',
  [PlusFriendType.GROUP]: '그룹',
}

export const ParameterType = {
  BASIC: 'BASIC',
  AUTO: 'AUTO',
  PERSONAL: 'PERSONAL',
} as const
export type ParameterType = (typeof ParameterType)[keyof typeof ParameterType]
export const ParameterTypeMap = {
  [ParameterType.BASIC]: '일반',
  [ParameterType.AUTO]: '자동계산',
  [ParameterType.PERSONAL]: '개인정보',
} as const
export const ParameterTypeOptions = [
  createOption(ParameterTypeMap[ParameterType.BASIC], ParameterType.BASIC),
  createOption(ParameterTypeMap[ParameterType.AUTO], ParameterType.AUTO),
  createOption(
    ParameterTypeMap[ParameterType.PERSONAL],
    ParameterType.PERSONAL
  ),
]
