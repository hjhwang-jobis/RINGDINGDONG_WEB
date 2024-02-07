import { createOption } from '~/components/SelectBox'
import { PageSize, Paging } from '~/types/searchCondition'

export const PageSizes = [5, 10, 15, 20, 50, 100] as const

export const DEFAULT_PAGE_NO = 1

export const DEFAULT_PAGE_SIZE: PageSize = 20

export const DEFAULT_PAGE_SIZE_SMALL = 3

export const DEFAULT_PAGE_SIZE_LARGE = 100

export const DEFAULT_PAGING: Paging = { page: 0, size: DEFAULT_PAGE_SIZE }

export type PageSizes = (typeof PageSizes)[number]

export const yyyy_MM_dd = 'yyyy-MM-dd'
export const DAYS_IN_5YEARS = 365 * 5

export const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
}
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection]

export const FileType = {
  jpg: '.jpg',
  png: '.png',
  jpeg: '.jpeg',
} as const
export type FileType = (typeof FileType)[keyof typeof FileType]

// NOTE: 1kb가 1024byte가 아닌 1000byte인 이유는 다음 링크를 참조 부탁드립니다.
// https://github.com/jobisnvillains/3o3_internal_service/commit/2f77972bb5b3cc618594d85bc77addfb5a2fae73#r130482469
export const FileByteSize = {
  _1KB: 1000,
  _500KB: 500000,
  _1MB: 1000000,
  _2MB: 2000000,
  _10MB: 10000000,
}
export type FileByteSize = (typeof FileByteSize)[keyof typeof FileByteSize]
export const FileByteSizeMessage = {
  [FileByteSize._500KB]: '500KB',
  [FileByteSize._1MB]: '1MB',
  [FileByteSize._2MB]: '2MB',
  [FileByteSize._10MB]: '10MB',
}

export const CdnAssetGroup = {
  AlimTalk: 'AlimTalk',
  Push: 'Push',
  AlimList: 'AlimList',
} as const
export type CdnAssetGroup = (typeof CdnAssetGroup)[keyof typeof CdnAssetGroup]
export const CdnAssetGroupMap = {
  [CdnAssetGroup.AlimTalk]: '알림톡',
  [CdnAssetGroup.Push]: '푸시',
  [CdnAssetGroup.AlimList]: '알림리스트',
} as const

export const SendTestMessagePriority = {
  FASTEST: 'FASTEST',
  FAST: 'FAST',
  NORMAL: 'NORMAL',
}
export type SendTestMessagePriority =
  (typeof SendTestMessagePriority)[keyof typeof SendTestMessagePriority]
export const SendTestMessagePriorityMap = {
  [SendTestMessagePriority.FASTEST]: '가장빠름',
  [SendTestMessagePriority.FAST]: '빠름',
  [SendTestMessagePriority.NORMAL]: '보통',
}

export const SendTestMessageTagType = {
  RDD: 'RDD',
}
export type SendTestMessageTagType =
  (typeof SendTestMessageTagType)[keyof typeof SendTestMessageTagType]
export const SendTestMessageTagTypeMap = {
  [SendTestMessageTagType.RDD]: '링딩동',
}

export const AlimtalkChannelType = {
  SZS: 'SZS',
  SZS_HOW: 'SZS_HOW',
  MYBIZ: 'MYBIZ',
  PARTNER: 'PARTNER',
  CLAIM: 'CLAIM',
  SZS_INTERVIEW: 'SZS_INTERVIEW',
  SZS_GOODJOB: 'SZS_GOODJOB',
} as const
export type AlimtalkChannelType =
  (typeof AlimtalkChannelType)[keyof typeof AlimtalkChannelType]
export const AlimtalkChannelTypeToChannelIdMap = {
  [AlimtalkChannelType.SZS]: '@3o3',
  [AlimtalkChannelType.SZS_HOW]: '@3o3_howp',
  [AlimtalkChannelType.MYBIZ]: '@3o3_mybiz',
  [AlimtalkChannelType.PARTNER]: '@3o3_p',
  [AlimtalkChannelType.CLAIM]: '@3o3_claim',
  [AlimtalkChannelType.SZS_INTERVIEW]: '@3o3_interview',
  [AlimtalkChannelType.SZS_GOODJOB]: '@3o3_goodjob',
}
export const AlimlistChannelIdToChannelTypeMap = {
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS]]:
    AlimtalkChannelType.SZS,
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_HOW]]:
    AlimtalkChannelType.SZS_HOW,
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.MYBIZ]]:
    AlimtalkChannelType.MYBIZ,
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.PARTNER]]:
    AlimtalkChannelType.PARTNER,
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.CLAIM]]:
    AlimtalkChannelType.CLAIM,
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_INTERVIEW]]:
    AlimtalkChannelType.SZS_INTERVIEW,
  [AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_GOODJOB]]:
    AlimtalkChannelType.SZS_GOODJOB,
}
export const AlimtalkChannelTypeOptions = [
  createOption('없음', ''),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS],
    AlimtalkChannelType.SZS
  ),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_HOW],
    AlimtalkChannelType.SZS_HOW
  ),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.MYBIZ],
    AlimtalkChannelType.MYBIZ
  ),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.PARTNER],
    AlimtalkChannelType.PARTNER
  ),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.CLAIM],
    AlimtalkChannelType.CLAIM
  ),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_INTERVIEW],
    AlimtalkChannelType.SZS_INTERVIEW
  ),
  createOption(
    AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_GOODJOB],
    AlimtalkChannelType.SZS_GOODJOB
  ),
]

export const REGEX_WEB_URL =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/

export const REGEX_REPLACEABLE_TEXT = /\#\{[A-Z0-9_]{1,30}\}/

export const MessageChannelType = {
  PUSH: 'PUSH',
  ALIMTALK: 'ALIMTALK',
  FRIENDTALK: 'FRIENDTALK',
  ALIMLIST: 'ALIMLIST',
} as const
export type MessageChannelType =
  (typeof MessageChannelType)[keyof typeof MessageChannelType]
export const MessageChannelTypeMap = {
  [MessageChannelType.PUSH]: '푸시',
  [MessageChannelType.ALIMTALK]: '알림톡',
  [MessageChannelType.FRIENDTALK]: '친구톡',
  [MessageChannelType.ALIMLIST]: '알림리스트',
} as const
export const MessageChannelTypeOptions = Object.values(MessageChannelType).map(
  (v) => ({
    label: MessageChannelTypeMap[v],
    value: v,
  })
)

export const MessageGroupSendStatusType = {
  WAITING: 'WAITING',
  SCHEDULING: 'SCHEDULING',
  PREPARING: 'PREPARING',
  SENDING: 'SENDING',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
} as const
export type MessageGroupSendStatusType =
  (typeof MessageGroupSendStatusType)[keyof typeof MessageGroupSendStatusType]
export const MessageGroupSendStatusTypeMap = {
  [MessageGroupSendStatusType.WAITING]: '발송대기',
  [MessageGroupSendStatusType.SCHEDULING]: '스케쥴링중',
  [MessageGroupSendStatusType.PREPARING]: '발송준비중',
  [MessageGroupSendStatusType.SENDING]: '발송중',
  [MessageGroupSendStatusType.DONE]: '발송완료',
  [MessageGroupSendStatusType.CANCELED]: '발송취소',
} as const

export const MessageGroupTemplateSendStatusType = {
  WAITING: 'WAITING',
  PREPARING: 'PREPARING',
  SENDING: 'SENDING',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
} as const
export type MessageGroupTemplateSendStatusType =
  (typeof MessageGroupTemplateSendStatusType)[keyof typeof MessageGroupTemplateSendStatusType]
export const MessageGroupTemplateSendStatusTypeMap = {
  [MessageGroupTemplateSendStatusType.WAITING]: '발송대기',
  [MessageGroupTemplateSendStatusType.PREPARING]: '발송준비중',
  [MessageGroupTemplateSendStatusType.SENDING]: '발송중',
  [MessageGroupTemplateSendStatusType.DONE]: '발송완료',
  [MessageGroupTemplateSendStatusType.CANCELED]: '발송취소',
} as const

export const SendProfile = {
  SZS: 'SZS',
  SZS_HOW: 'SZS_HOW',
  MYBIZ: 'MYBIZ',
  PARTNER: 'PARTNER',
  CLAIM: 'CLAIM',
  SZS_INTERVIEW: 'SZS_INTERVIEW',
  SZS_GOODJOB: 'SZS_GOODJOB',
  NONE: 'NONE',
} as const
export type SendProfile = (typeof SendProfile)[keyof typeof SendProfile]
export const SendProfileMap = {
  [SendProfile.SZS]: '삼쩜삼',
  [SendProfile.SZS_HOW]: '삼쩜삼 하우',
  [SendProfile.MYBIZ]: '마이비즈',
  [SendProfile.PARTNER]: '파트너센터',
  [SendProfile.CLAIM]: '당당청구',
  [SendProfile.SZS_INTERVIEW]: '삼쩜삼 인터뷰',
  [SendProfile.SZS_GOODJOB]: '삼쩜삼 굿잡',
  [SendProfile.NONE]: '없음',
} as const
export const SendProfileToAlimtalkChannelTypeMap = {
  [SendProfile.SZS]: AlimtalkChannelType.SZS,
  [SendProfile.SZS_HOW]: AlimtalkChannelType.SZS_HOW,
  [SendProfile.MYBIZ]: AlimtalkChannelType.MYBIZ,
  [SendProfile.PARTNER]: AlimtalkChannelType.PARTNER,
  [SendProfile.CLAIM]: AlimtalkChannelType.CLAIM,
  [SendProfile.SZS_INTERVIEW]: AlimtalkChannelType.SZS_INTERVIEW,
  [SendProfile.SZS_GOODJOB]: AlimtalkChannelType.SZS_GOODJOB,
  [SendProfile.NONE]: AlimtalkChannelType.SZS, // NOTE: 오류 가능성 있음. 추후 수정 필요!
}
export const SendProfileOptions = Object.values(SendProfile).map((v) => ({
  label: SendProfileMap[v],
  value: v,
}))

export const ActiveTypeMap = {
  ACTIVE: '활성화',
  DEACTIVE: '비활성화',
}

export const PageMode = {
  READ_ONLY: 'READ_ONLY',
  EDIT: 'EDIT',
} as const
export type PageMode = (typeof PageMode)[keyof typeof PageMode]

export const MESSAGE_GROUP_PARTITION_FROM_MIN = 1
export const MESSAGE_GROUP_PARTITION_TO_MAX = 100

export const PERSONAL_PARAMETER_SET = new Set([
  '#{NAME}',
  '#{OTHER_NAME}',
  'NAME',
  'OTHER_NAME',
])

export const TIME_FORMAT_HH_MM = 'HH:mm'
export const DATE_FORMAT_YYYY_MM_DD = 'yyyy-MM-dd'
