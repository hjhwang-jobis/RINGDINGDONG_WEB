import { REGEX_REPLACEABLE_TEXT, REGEX_WEB_URL } from '~/constants'

/**
 * url 포맷에 맞는지 확인 (https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/)
 * @param {string} url url 문자열
 * @returns {boolean} url 여부
 */
export const isUrl = (url: string) => REGEX_WEB_URL.test(url.toLowerCase())

/**
 * 기본 파라미터 포맷인지 확인 (https://rdd-internal.dev.jobis.co/docs#/%EA%B8%B0%EB%B3%B8%20%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%20%EA%B4%80%EB%A6%AC/create_parameter_api_v1_parameters_basics_post)
 * @param {string} v 기본 파라미터를 포함한 문자열
 * @returns {boolean} 기본 파라미터 포함 여부
 */
export const isReplaceableText = (v: string) => REGEX_REPLACEABLE_TEXT.test(v)

type ValidateInRule = () => string | true

/**
 * ValidateInRule 함수들의 결과를 합쳐서 돌려줍니다.
 * @param {ValidateInRule[]} rules 유효성 검사 배열
 * @returns {string | true} 에러일 경우, 문자열 반환. 유효하면 true
 */
export function run(rules: ValidateInRule[]) {
  const validation = rules.reduce((acc, rule) => {
    const result = rule()
    if (result === true) {
      return acc
    }
    if (typeof result === 'string') {
      return acc ? `${acc} ${result}` : result
    }

    return acc
  }, '')

  if (validation === '') {
    return true
  }

  return validation
}

/**
 * 문자열의 최소, 최대 글자수를 검사하고 유효하지 않으면 에러 메시지를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @param {number} min 검사할 문자열의 최소길이
 * @param {number} max 검사할 문자열의 최대길이
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesStrMinMax(v: string, min: number, max: number) {
  return () => {
    if (!v || v.length < min || max < v.length) {
      return `${min}자 이상, ${max}자 이하로 입력해주세요.`
    }

    return true
  }
}

/**
 * 문자열의 최소, 최대 글자수를 검사하고 유효하지 않으면 에러 메시지를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @param {number} min 검사할 문자열의 최소길이
 * @param {number} max 검사할 문자열의 최대길이
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesStrMinMaxAllowEmpty(
  v: string,
  min: number,
  max: number
) {
  return () => {
    if (v === '') {
      return true
    }
    if (v.length < min || max < v.length) {
      return `${min}자 이상, ${max}자 이하로 입력해주세요.`
    }

    return true
  }
}

/**
 * 링딩동의 템플릿 코드 패턴(영문 대소문자/언더바/숫자)에 맞는지 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesFormatTemplateCode(v: string) {
  return () => {
    if (!RegExp(/^[A-Z|0-9|_]+$/).test(v)) {
      return '영문 대문자/언더바/숫자로만 입력해주세요.'
    }

    return true
  }
}

/**
 * 링딩동의 템플릿 코드 패턴(영문 대소문자/언더바/숫자)에 맞는지 검사하는 함수를 돌려줍니다. 공백을 허용하여 값이 없는 상태도 허용합니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesFormatTemplateCodeAllowEmpty(v: string) {
  return () => {
    if (!v) {
      return true
    }
    if (!RegExp(/^[A-Z|a-z|0-9|_]+$/).test(v)) {
      return '영문 대소문자/언더바/숫자로만 입력해주세요.'
    }

    return true
  }
}

/**
 * 링딩동의 자동치환자 패턴을 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesFormatAutoFillParameter(v: string) {
  return () => {
    if (!isReplaceableText(v)) {
      return '유효한 자동치환 파라미터 포맷("#{영문대문자,숫자,언더바,30자 이내}")을 입력해주세요'
    }

    return true
  }
}

/**
 * 링딩동의 기본 파라미터(Basic Parameter) 패턴을 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesFormatBasicParameter(v: string) {
  return () => {
    if (!isReplaceableText(v)) {
      return '유효한 기본 파라미터 포맷("#{영문대문자,숫자,언더바,30자 이내}")을 입력해주세요'
    }

    return true
  }
}

/**
 * 링딩동의 url 패턴을 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesFormatUrl(v: string) {
  return () => {
    if (!isUrl(v)) {
      return '유효한 url 형식으로 입력해주세요'
    }

    return true
  }
}

/**
 * 링딩동의 url 패턴을 검사하는 함수를 돌려줍니다. 공백상태를 허용합니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesFormatUrlOrEmpty(v: string) {
  return () => {
    if (v === '') return true
    if (!isUrl(v)) {
      return '유효한 url 형식으로 입력해주세요'
    }

    return true
  }
}

/**
 * 링딩동의 required 패턴을 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 아무것도 반환하지 않음.
 */
export function validateInRulesRequired(v: string) {
  return () => {
    if (!v) {
      return '입력된 값이 없습니다. 다시 확인해주세요.'
    }

    return true
  }
}

/**
 * Toggle, Checkbox 등의 boolean 값을 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 true.
 */
export function validateInRulesBoolean(v: boolean | undefined) {
  return () => {
    if (typeof v !== 'boolean') {
      return 'Boolean 값이 아닙니다. 다시 확인해주세요.'
    }

    return true
  }
}

/**
 * userId 패턴(숫자이면서 8글자)에 맞는지 검사하는 함수를 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 true.
 */
export function validateInRulesFormatUserId(v: string) {
  return () => {
    if (!RegExp(/^[0-9]{1,10}$/).test(v)) {
      return '10자리 이하 숫자로 입력해주세요.'
    }

    return true
  }
}

/**
 * 숫자를 입력하는 경우, 입력 범위에 대해 검사합니다.
 * @param {string} v 검사할 문자열
 * @returns {string | void} 에러일 경우, 문자열 반환. 유효하면 true.
 */
export function validateInRulesNumberRange(
  v: string,
  min: number,
  max: number
) {
  return () => {
    const num = Number(v)
    if (!v || num < min || num > max) {
      return `${min} 이상, ${max} 이하여야 합니다.`
    }

    return true
  }
}
// TODO 테스트 코드가 필요합니다.
