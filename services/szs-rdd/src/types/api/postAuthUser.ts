export interface ResponseSuccess {
  status_code: number
  message: string
}

export interface ResponseFail {
  detail: string
}

export type Response = ResponseSuccess | ResponseFail
