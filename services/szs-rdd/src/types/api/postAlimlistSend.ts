import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/alimlist/send (알림리스트 단건 발송)
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_alimlist_api_v1_alimlist_send_post
 */

export type Request = PostAlimlistSendRequest
export type Response = {}

/**
 * @interface PostAlimlistSendRequest 알림리스트 단건 전송
 * @param {number} userId 유저 아이디(테리?)
 * @param {string} templateCode 템플릿 코드
 * @param {ParameterMap} requestParameter 요청 파라미터 값 ex) 예상환급액: 6000
 * @param {ParameterMap} autoFillParameter 치환해야 하는 파라미터의 유저가 각각 다를 때 ex) NAME: 1233212, OTHER_NAME: 221312
 */
export interface PostAlimlistSendRequest {
  userId: number
  templateCode: string
  requestParameter: ParameterMap
  autoFillParameter: ParameterMap
}
