/**
 * @see Swagger PUT /api/v1/testers/delete (테스터 벌크 삭제)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/delete_testers_api_v1_testers_delete_post
 */

export type Request = PostTesterDeleteRequest
export type Response = {}

/**
 * @interface PostTesterDeleteRequest
 * @param {number[]} ids 삭제할 테스터 id 배열
 * @see Swagger - 테스터 수정
 * https://rdd-internal.dev.jobis.co/docs#/%ED%85%8C%EC%8A%A4%ED%84%B0%20%EA%B4%80%EB%A6%AC/delete_testers_api_v1_testers_delete_post
 */
export interface PostTesterDeleteRequest {
  ids: number[]
}
