// export interface Response<T = null> {
//   data: T
//   status_code?: string
//   message?: string
//   error?: ApiError
// }

/**
 * @interface Pagination
 * @param {number} pageSize - 조회하려는 페이지의 번호. 0부터 시작합니다.
 * @param {number} pageNo - 한 페이제에서 노출하는 row의 갯수.
 * @param {number} totalElements - DB에 저장되어 있는 총 row의 갯수. 전체 페이지 수를 계산하는데 필요합니다.
 * @param {number} totalPage - DB에 저장되어 있는 총 row의 갯수를 pageSize로 나눈 총 페이지 수.
 */
export interface Pagination {
  pageSize: number
  pageNo: number
  totalElements: number
  totalPage: number
}
export interface PrimitiveMap {
  [key: string]: string | number | boolean
}

// NOTE: @3o3-internal/utils 에서 가져옴
export interface Response<T = null> {
  ok: boolean
  data: T
  status?: string
  error?: ApiError
  validations?: Validation[]
}

export interface ApiError<T = unknown> {
  code?: number
  type?: string
  status?: number | string
  message: string
  data?: T
  validations?: Validation[]
}

export interface Validation {
  field: string
  message: string
}
