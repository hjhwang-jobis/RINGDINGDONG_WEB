/**
 * @see Swagger PUT /api/v1/targets/queries/{targetQueryId} (타겟 쿼리 수정)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EC%BF%BC%EB%A6%AC%20%EA%B4%80%EB%A6%AC/update_target_query_api_v1_targets_queries__targetQueryId__put
 */

export type Request = PutTargetsQueriesCalculateMutationRequest
export type Response = {}

/**
 * @interface PutTargetsQueriesCalculateMutationRequest
 * @param {string} targetQueryId 타겟 쿼리 아이디
 */
export interface PutTargetsQueriesCalculateMutationRequest {
  targetQueryId: string
}
