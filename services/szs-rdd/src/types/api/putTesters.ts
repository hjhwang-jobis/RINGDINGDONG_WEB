/**
 * @see Swagger PUT /api/v1/testers (테스터 수정)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/update_tester_api_v1_testers__testerId__put
 */

export type Request = PutTestersRequest
export type Response = {}

/**
 * @interface PutTesterRequest
 * @param {number} userId terry user id
 * @param {string} note 테스터 구분용 노트
 * @see Swagger - 테스터 수정
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/update_tester_api_v1_testers__testerId__put
 */
export interface PutTestersRequest {
  testerId: number
  userId: number
  note: string
}
