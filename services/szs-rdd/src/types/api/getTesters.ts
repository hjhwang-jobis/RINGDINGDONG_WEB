/**
 * @see Swagger GET /api/v1/testers
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_tester_api_v1_testers__testerId__get
 */

export type Request = GetTestersRequest
export type Response = GetTestersResponse
/**
 * @interface GetTestersRequest
 * @param {number} testerId 테스터 아이디
 */
export interface GetTestersRequest {
  testerId: number
}

type GetTestersResponse = Tester

export interface Tester {
  id: number
  userId: number
  note: string
  createdAt: string
  updatedAt: string
}
