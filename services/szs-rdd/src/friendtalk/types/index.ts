import { SendProfile } from '~/constants'
import {
  FriendtalkButtonTarget,
  FriendtalkButtonType,
  FriendtalkTemplateType,
} from '~/friendtalk/constants'
import { ParameterMap } from '~/types'

export interface FriendtalkBasicTextWideImageContent {
  imageUrl: string
  imageLink: string
  comment: string
  buttons: FriendtalkButton[]
}

interface FriendtalkCarouselContentItem {
  // NOTE: 추가와 삭제를 위해 클라이언트에서만 사용하는 id입니다.
  id?: number
  imageUrl: string
  header: string
  comment: string
  buttons: FriendtalkButton[]
}

export interface FriendtalkCarouselContent {
  items: FriendtalkCarouselContentItem[]
  carouselTail: FriendtalkCarouselTail
}

interface FriendtalkWideListContentItem {
  title: string
  imageUrl: string
  comment: string
  linkMobile: string
  linkPc: string
}
export interface FriendtalkWideListContent {
  buttons: FriendtalkButton[]
  header: string
  items: FriendtalkWideListContentItem[]
}

/**
 * @interface BaseAndWideImageTemplate
 * @param {string} imageUrl
 * @param {string} imageLink
 * @param {string} comment
 * @param {FriendtalkButton[]} buttons
 * @param {FriendtalkCouponButton} couponButton
 * @see Swagger - 카카오 친구톡(소재 타입: 와이드 이미지)
 * https://dingdong-api.dev.3o3.co.kr/swagger/swagger-ui/index.html
 */
export interface BaseAndWideImageTemplate {
  imageUrl: string
  imageLink: string
  comment: string
  buttons: FriendtalkButton[]
  couponButton: FriendtalkCouponButton
}

/**
 * @interface FriendtalkButton
 * @param {FriendtalkButtonType} friendtalkButtonType
 * @param {string} name
 * @param {string} linkPc
 * @param {string} linkMobile
 * @param {string} schemeIos (Optional)
 * @param {string} schemeAndroid (Optional)
 * @param {string} chatExtra (Optional)
 * @param {string} chatEvent(Optional)
 * @param {FriendtalkButtonTarget} target
 * @see Swagger - 카카오 친구톡
 * https://dingdong-api.dev.3o3.co.kr/swagger/swagger-ui/index.html
 */
export interface FriendtalkButton {
  friendtalkButtonType: FriendtalkButtonType
  name: string
  linkPc: string
  linkMobile: string
  schemeIos?: string | null
  schemeAndroid?: string | null
  chatExtra?: string | null
  chatEvent?: string | null
  target?: FriendtalkButtonTarget | null
}

interface FriendtalkCarouselTail {
  linkPc: string
  linkMobile: string
  schemeIos: string
  schemeAndroid: string
}

/**
 * @interface FriendtalkCouponButton
 * @param {string} title
 * @param {string} description
 * @param {string} linkMobile
 * @param {string} linkPc
 * @param {string} schemeAndroid
 * @param {string} schemeIos
 * @see Swagger - 카카오 친구톡
 * https://dingdong-api.dev.3o3.co.kr/swagger/swagger-ui/index.html
 */
export interface FriendtalkCouponButton {
  title: string
  description: string
  linkMobile: string
  linkPc: string
  schemeAndroid: string
  schemeIos: string
}

/**
 * @interface WideListItem
 * @param {string} header
 * @param {WideListItemRequest[]} wideListItemRequests
 * @param {FriendtalkButton[]} buttons
 * @param {FriendtalkCouponButton[]} couponButton
 */
export interface WideListItem {
  header: string
  wideListItemRequests: WideListItemRequest[]
  buttons: FriendtalkButton[]
  couponButton?: FriendtalkCouponButton[]
}

/**
 * @interface WideListItemRequest
 * @param {number} imageId
 * @param {string} title
 * @param {string} comment
 * @param {string} linkPc
 * @param {string} linkMobile
 * @param {string} schemeAndroid
 * @param {string} schemeIos
 * @param {string} imageUrl
 */
export interface WideListItemRequest {
  imageId: number
  title: string
  linkPc: string
  linkMobile: string
  schemeAndroid?: string
  schemeIos?: string
}

/**
 * @interface CarouselTemplate
 * @param {CarouselItem[]} items
 * @param {CarouselTail} carouselTail
 * @see Swagger - 카카오 친구톡(소재 타입: 캐러셀)
 * https://dingdong-api.dev.3o3.co.kr/swagger/swagger-ui/index.html
 */
export interface CarouselTemplate {
  items: CarouselItem[]
  carouselTail: CarouselTail
}

/**
 * @interface CarouselItem
 * @param {number} imageId 이미지 아이디
 * @param {string} imageLink 이미지 링크
 * @param {string} header 타이틀
 * @param {string} message 홍보 문구
 * @param {FriendtalkButton[]} buttons 버튼 목록
 */
export interface CarouselItem {
  imageId: number
  imageLink: string
  header: string
  message: string
  buttons: FriendtalkButton[]
}

/**
 * @interface CarouselTail
 * @param {string} linkMobile
 * @param {string} linkPc
 * @param {string} schemeIos
 * @param {string} schemeAndroid
 * @see Swagger - 카카오 친구톡
 * https://dingdong-api.dev.3o3.co.kr/swagger/swagger-ui/index.html
 */
export interface CarouselTail {
  linkMobile: string
  linkPc: string
  schemeIos: string | null
  schemeAndroid: string | null
}

export type FriendtalkButtonBaseType = {
  isShow: boolean
  isOutlink: boolean
} & FriendtalkButton
export interface ContentTypeBase {
  imageId: number
  imageUrl: string
  imageLink: string
  comment: string
  buttons: FriendtalkButtonBaseType[]
  couponButton: FriendtalkCouponButton
}

export type FriendtalkButtonWideImageType = {
  isShow: boolean
  isOutlink: boolean
} & FriendtalkButton
export interface ContentTypeWideImage {
  imageId: number
  imageUrl: string
  imageLink: string
  comment: string
  buttons: FriendtalkButtonWideImageType[]
  couponButton: FriendtalkCouponButton
}

export interface ContentTypeWideList {
  header: string
  items: ContentTypeWideListItem[]
  buttons: FriendtalkButtonWideListType[]
  couponButton: FriendtalkCouponButton
}

export type FriendtalkButtonWideListType = {
  isOutlink: boolean
} & FriendtalkButton

export type ContentTypeWideListItem = {
  isShow?: boolean
  imageUrl: string
} & WideListItemRequest

export interface ContentTypeCarousel {
  items: ContentTypeCarouselItem[]
  carouselTail: CarouselTail
}

export type ContentTypeCarouselItemFriendtalkButton = Omit<
  FriendtalkButton,
  'schemeIos' | 'schemeAndroid' | 'chatExtra' | 'chatEvent'
>

export interface ContentTypeCarouselItem {
  imageUrl: string
  imageLink: string
  imageId: number
  header: string
  message: string
  buttons: ContentTypeCarouselItemFriendtalkButton[]
}

export interface FormTypeBaseData {
  templateType: FriendtalkTemplateType
  templateCode: string
  sendProfile: SendProfile
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  imageIds: number[]
  contentTypeBase: ContentTypeBase
}

export interface FormTypeCarouselData {
  templateType: FriendtalkTemplateType
  templateCode: string
  sendProfile: SendProfile
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  imageIds: number[]
  contentTypeCarousel: ContentTypeCarousel
}

export interface FormTypeWideImageData {
  templateType: FriendtalkTemplateType
  templateCode: string
  sendProfile: SendProfile
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  imageIds: number[]
  contentTypeWideImage: ContentTypeWideImage
}

export interface FormTypeWideListData {
  templateType: FriendtalkTemplateType
  templateCode: string
  sendProfile: SendProfile
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  imageIds: number[]
  contentTypeWideList: ContentTypeWideList
}

export interface FormTypeMap {
  templateType: FriendtalkTemplateType
  templateCode: string
  sendProfile: SendProfile
  description: string
  requestParameter: string[]
  autoFillParameter: ParameterMap
  imageIds: number[]
  contentTypeBase: ContentTypeBase
  contentTypeWideImage: ContentTypeWideImage
  contentTypeWideList: ContentTypeWideList
  contentTypeCarousel: ContentTypeCarousel
}
