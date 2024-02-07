import { SendTestMessageTagType } from '~/constants'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/friendtalk/send (친구톡 단건 발송)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%B9%9C%EA%B5%AC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_friendtalk_api_v1_friendtalk_send_post
 */

export type Request = PostFriendtalkSendRequest
export type Response = {}

/**
 * @interface PostFriendtalkSendRequest 친구톡 단건 전송
 * @param {SendTestMessageTagType} tag 태그
 * @param {string} templateCode 템플릿 코드
 * @param {number} userId 유저 아이디(테리?)
 * @param {ParameterMap} requestParameter 요청 파라미터 값 ex) 예상환급액: 6000
 * @param {ParameterMap} autoFillParameter 치환해야 하는 파라미터의 유저가 각각 다를 때 ex) NAME: 1233212, OTHER_NAME: 221312
 * @param {boolean} containsAlimlist 알림리스트 포함 발송 여부 (친구톡, 푸시만 가능)
 */
export interface PostFriendtalkSendRequest {
  tag?: SendTestMessageTagType
  templateCode: string
  userId: number
  requestParameter: ParameterMap
  autoFillParameter: ParameterMap
  containsAlimlist?: boolean
}
