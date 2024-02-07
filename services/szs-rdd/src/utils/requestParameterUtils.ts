import { isAutoFillParameter } from './autoFillParameterUtils'
import {
  extractReplaceableKey,
  findReplaceableTextVariableList,
} from './parameterUtils'

const isNotAutoFillParameter = (v: string) => !isAutoFillParameter(v)

/**
 * 문자열에서 요청치환 객체(RequestParameterField) 리스트를 돌려줍니다.
 * @param {strnig} text 대상 문자열
 * @returns {string[]}
 */
export const createRequestParameterFromText = (text: string) =>
  findReplaceableTextVariableList(text)
    .filter((key: string) => isNotAutoFillParameter(key))
    .map((key: string) => extractReplaceableKey(key))
