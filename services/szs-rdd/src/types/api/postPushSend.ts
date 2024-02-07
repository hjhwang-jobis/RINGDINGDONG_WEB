import { SendTestMessagePriority } from '~/constants'
import { ParameterMap } from '~/types'

/**
 * @see Swagger POST /api/v1/push/send (푸시 단건 발송)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%91%B8%EC%8B%9C%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/send_push_api_v1_push_send_post
 */

export type Request = PushSendRequest
export type Response = {}

/**
 * @interface PushSendRequest 푸시 단건 전송
 * @param {number} userId 유저 아이디(테리?)
 * @param {string} templateCode 템플릿 코드
 * @param {ParameterMap} templateParameter 요청 파라미터 값 ex) 예상환급액: 6000
 * @param {ParameterMap} autoFillParameter 치환해야 하는 파라미터의 유저가 각각 다를 때 ex) NAME: 1233212, OTHER_NAME: 221312
 * @param {SendTestMessagePriority} priority 발송 우선 순위
 * @param {boolean} containsAlimlist 알림리스트 포함 발송 여부
 */
export interface PushSendRequest {
  userId: number
  templateCode: string
  templateParameter: ParameterMap
  autoFillParameter: ParameterMap
  priority?: SendTestMessagePriority
  containsAlimlist?: boolean
}
