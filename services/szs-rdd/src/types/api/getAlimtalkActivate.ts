/**
 * @see Swagger GET /api/v1/alimtalk/activate/{templateCode} 알림톡 템플릿 파라미터 목록 조회. 활성화 시 사용
 * https://rdd-internal.dev.jobis.co/docs#/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B4%80%EB%A6%AC/get_alimtalk_template_parameters_api_v1_alimtalk_activate__templateCode__get
 */

export type Request = GetAlimtalkActivateRequest
export type Response = GetAlimtalkActivateResponse

/**
 * @interface GetAlimtalkActivateRequest
 * @param {string} templateCode - 템플릿 코드
 * @see Swagger - 알림톡 템플릿 상세 조회
 */
export interface GetAlimtalkActivateRequest {
  templateCode: string
}

/**
 * @interface GetAlimtalkActivateResponse 알림톡 템플릿 파라미터 목록 조회 응답
 * @param {string} parameters JSON.stringify 된 문자열
 */
export type GetAlimtalkActivateResponse = {
  parameters: string
}
