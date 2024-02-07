/**
 * @see Swagger GET /api/v1/testers/list
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/get_testers_api_v1_testers_list_get
 */

export type Request = GetTestersListRequest
export type Response = GetTestersListResponse
/**
 * @interface GetTestersListRequest
 * @param {number} pageSize 페이지 크기 (max: 100)
 * @param {number} pageNo 페이지 번호 (default: 0)
 * @param {string} userId 검색할 userId, only exactly matching
 * @param {string} note 검색할 note, like 검색
 */
export interface GetTestersListRequest {
  pageSize: number
  pageNo: number
  userId?: string
  note?: string
}

/**
 * @interface GetTestersListResponse
 * @param {number} pageSizes
 * @param {number} pageNo
 * @param {number} totalElements
 * @param {number} totalPage
 * @param {Tester[]} contents
 */
interface GetTestersListResponse {
  pageSize: number
  pageNo: number
  totalElements: number
  totalPage: number
  contents: Tester[]
}

export interface Tester {
  id: number
  userId: number
  note: string
  createdAt: string
  updatedAt: string
}
