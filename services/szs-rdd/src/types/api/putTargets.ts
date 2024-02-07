import { GetTargets } from '~/types/api'

/**
 * @see Swagger PUT /api/v1/targets/{targetId} (타겟 수정)
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/update_target_api_v1_targets__targetId__put
 */

export type Request = PutTargetsRequest
export type Response = {}

/**
 * @interface PutTargetsRequest
 * @param {number} targetId 타겟 id
 * @param {string} title 타겟 이름
 * @param {boolean} isDropDuplicated 집계간 중복제거 여부 Default:true
 * @param {boolean} isExcludeDeniers 수신거부자 제외 여부 Default:true
 * @param {GetTargets.Frequency[]} frequencies 수신빈도 목록
 * @param {number[]} includeTargetQueries 포함될 타겟 쿼리 id 목록
 * @param {number[]} excludeTargetQueries 제외될 타겟 쿼리 id 목록
 * @param {number[]} includeMessageGroups 포함될 메세지그룹 id 목록
 * @param {number[]} excludeMessageGroups 제외될 메세지그룹 id 목록
 */
export interface PutTargetsRequest {
  targetId: number
  title: string
  isDropDuplicated: boolean
  isExcludeDeniers: boolean
  frequencies: GetTargets.Frequency[]
  includeTargetQueries: number[]
  excludeTargetQueries: number[]
  includeMessageGroups: number[]
  excludeMessageGroups: number[]
}
