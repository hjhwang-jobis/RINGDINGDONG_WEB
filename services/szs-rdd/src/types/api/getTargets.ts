import { TargetFrequencyChannelType } from '~/target/constants'
import { Author, Campaign } from '~/types'

import { GetDoneMessageGroupsList } from '.'

/**
 * @see Swagger GET /api/v1/targets/{targetId} 타겟 상세 조회
 * https://rdd-internal.dev.jobis.co/docs#/%ED%83%80%EA%B2%9F%20%EA%B4%80%EB%A6%AC/get_target_api_v1_targets__targetId__get
 */

export type Request = GetTargetsRequest
export type Response = GetTargetsResponse

/**
 * @interface GetTargetsRequest
 * @param {number} targetId 검색할 targetId, only exactly matching
 */
interface GetTargetsRequest {
  targetId: number
}

type GetTargetsResponse = Target

/**
 * @interface Target
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} targetId 타겟 아이디
 * @param {string} title 타겟 이름
 * @param {boolean} isDropDuplicated 집계간 중복제거 여부 Default: true
 * @param {boolean} isExcludeDeniers 수신거부자 제외 여부 Default: true
 * @param {number | null} estimatedTargetCount 예상타켓모수, null이면 집계중
 * @param {Author} author 작성자 정보
 * @param {Campaign[]} campaigns 캠페인 목록
 * @param {Frequency[]} frequencies 수신빈도 목록
 * @param {TargetQuery[]} includeTargetQueries 포함 타겟 쿼리 목록
 * @param {TargetQuery[]} excludeTargetQueries 제외 타겟 쿼리 목록
 * @param {GetDoneMessageGroupsList.MessageGroup[]} includeMessageGroups 포함 수신 이력 목록
 * @param {GetDoneMessageGroupsList.MessageGroup[]} excludeMessageGroups 제외 수신 이력 목록
 */
export interface Target {
  id: number
  createdAt: string
  updatedAt: string
  targetId: string
  title: string
  isDropDuplicated: boolean
  isExcludeDeniers: boolean
  estimatedTargetCount?: number | null
  author: Author
  campaigns: Campaign[]
  frequencies: Frequency[]
  includeTargetQueries: TargetQuery[]
  excludeTargetQueries: TargetQuery[]
  includeMessageGroups: GetDoneMessageGroupsList.MessageGroup[]
  excludeMessageGroups: GetDoneMessageGroupsList.MessageGroup[]
}

/**
 * @interface Frequency
 * @param {number} withinDays N일 이내의 N 값 (0, 30)
 * @param {TargetFrequencyChannelType} channel 수신 채널
 * @param {number} moreThanCount N회 이상의 N 값 (0, 100)
 */
export interface Frequency {
  withinDays: number
  channel: TargetFrequencyChannelType
  moreThanCount: number
}

/**
 * @interface TargetQuery
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} title 쿼리 제목
 * @param {string | null} jiraTicketLink 요청 지라 티켓 링크
 * @param {string | null} description 쿼리 상세 설명
 * @param {string} query 쿼리
 * @param {string} queryId 쿼리 아이디
 * @param {Author} author 작성자 정보
 */
export interface TargetQuery {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  jiraTicketLink: string | null
  description: string | null
  query: string
  queryId: string
  lastCalculatedAt: string | null
  calculatedCount: string | null
  status: string | null
  author: Author
}
