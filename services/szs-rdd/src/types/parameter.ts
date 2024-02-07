/**
 * @interface Parameter
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} parameter 파라미터값, ${PARAMETER} 형식, 대문자/숫자/underscore만 입력 가능
 * @param {string} title 타이틀
 * @param {string} description 상세 설명
 * @param {string} default 발송 시 사용되는 파라미터 기본 값
 * @param {ParameterAuthor} author 작성자 정보
 */
export interface Parameter {
  id: number
  createdAt: string
  updatedAt: string
  parameter: string
  title: string
  description: string
  default: string
  author: ParameterAuthor
}

/**
 * @interface ParameterAuthor
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {string} name
 * @param {string} email
 */
export interface ParameterAuthor {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  email: string
}
