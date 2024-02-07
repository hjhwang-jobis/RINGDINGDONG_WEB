// GlobalModal 을 사용하기 위해 필수적으로 가져야하는 타입
export interface BaseModal {
  // useModal hook 에서 자동으로 부여되는 고유키
  modalKey: string
}

export interface GlobalModal<T extends BaseModal> {
  component: (props: T) => JSX.Element
  props: T
}

export type RequestParameter = string[]
export type ParameterField = { key: string; value: string }
export type ParameterMap = { [key: string]: string }

export interface SendTestMessagePayload {
  userId: number
  autoFillParameter: ParameterMap
  requestParameter: ParameterMap
  containsAlimlist: boolean
}

/**
 * @interface Author
 * @param {number} id 아이디
 * @param {string} createdAt 생성일자
 * @param {string} updatedAt 수정일자
 * @param {name} string 이름
 * @param {email} string 이메일
 */
export interface Author {
  id?: number
  createdAt?: string
  updatedAt?: string
  name: string
  email: string
}

export * from './campaign'
export * from './imageUploader'
export * from './messageGroup'
export * from './parameter'
export * from './searchCondition'
