import { GetTargets } from '~/types/api'

/**
 * @see Swagger POST /api/v1/targets (타겟 등록)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/create_target_api_v1_targets_post
 */

export type Request = PostTargetsRequest
export type Response = {}

/**
 * @interface PostTargetsRequest
 * @param {string} title 타겟 이름
 * @param {boolean} isDropDuplicated 집계간 중복제거 여부 Default:true
 * @param {boolean} isExcludeDeniers 수신거부자 제외 여부 Default:true
 * @param {GetTargets.Frequency[]} frequencies 수신빈도 목록
 * @param {number[]} includeTargetQueries 포함될 타겟 쿼리 id 목록
 * @param {number[]} excludeTargetQueries 제외될 타겟 쿼리 id 목록
 */
export interface PostTargetsRequest {
  title: string
  isDropDuplicated: boolean
  isExcludeDeniers: boolean
  frequencies: GetTargets.Frequency[]
  includeTargetQueries: number[]
  excludeTargetQueries: number[]
  includeMessageGroups: number[]
  excludeMessageGroups: number[]
}
