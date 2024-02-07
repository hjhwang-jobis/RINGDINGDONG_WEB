/**
 * @see Swagger POST /api/v1/testers (테스터 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/create_tester_api_v1_testers_post
 */

export type Request = PostTestersRequest
export type Response = {}

/**
 * @interface PostTestersRequest
 * @param {number} userId terry user id
 * @param {string} note 테스터 구분용 노트
 */
export interface PostTestersRequest {
  userId: number
  note: string
}
