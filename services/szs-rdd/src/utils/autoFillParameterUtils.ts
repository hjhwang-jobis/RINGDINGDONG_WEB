import { PERSONAL_PARAMETER_SET } from '~/constants'
import { ParameterField, ParameterMap } from '~/types'

import {
  extractReplaceableKey,
  findReplaceableTextVariableList,
} from './parameterUtils'

export const isAutoFillParameter = (key: string) =>
  PERSONAL_PARAMETER_SET.has(key)

/**
 * 문자열에서 자동치환 객체(AutoFillParameterField) 리스트를 돌려줍니다. 자동치환 객체의 value는 기본값인 빈 문자열입니다.
 * AutoFillParameter는 NAME/OTHER_NAME에 내가 아닌 다른 사람의 이름을 넣어야 할 때 사용하는 기능입니다.
 * @param {string} text 대상 문자열
 * @param {ParameterMap} autoFillParameter 자동치환 파라미터 맵
 * @returns {AutoFillParameterField[]}
 * @see https://jobis.slack.com/archives/C05BPGKMPS9/p1698630088507239?thread_ts=1698628898.372089&cid=C05BPGKMPS9
 */
export const createAutoFillParameterFieldListFromText = (
  text: string,
  autoFillParameter?: ParameterMap
): ParameterField[] => {
  return findReplaceableTextVariableList(text)
    .filter((key: string) => isAutoFillParameter(key))
    .map((key: string) => {
      const safeKey = extractReplaceableKey(key)

      return {
        key: safeKey,
        value:
          autoFillParameter && autoFillParameter[safeKey]
            ? autoFillParameter[safeKey]
            : '',
      }
    })
}

/**
 * 자동치환자 배열을 자동치환자 맵으로 바꿔줍니다.
 * @param {ParameterField[]} replacableParameterFieldList 자동치환 객체목록
 * @returns {AutoFillParameter} 지동정보치환맵. 현재는 개인정보치환만 한다. NAME만 지원한다. 홈택스 조회를 안한사람들이 대상. 이 경우 기본값을 써야하므로 맵형태로 키와 기본값을 관리함.
 */
export const convertToAutoFillParameter = (
  replacableParameterFieldList: ParameterField[]
): ParameterMap =>
  replacableParameterFieldList.reduce((acc, v) => {
    // NOTE: #{NAME}에서 NAME을 추출해냅니다.
    const key = extractReplaceableKey(v.key)

    return {
      ...acc,
      [key]: v.value,
    }
  }, {})

/**
 * 개인정보 자동치환자 배열을 정제해줍니다. NAME, OTHER_NAME이 모두 있는 경우에만, 유효한 배열을 돌려주고, 그 외의 경우에는 빈 배열을 돌려줍니다.
 * @param {ParameterField[]} parameterFieldList 개인정보 자동치환 파라미터 목록
 * @returns {ParameterField[]} 조건에 따른 배열값을 돌려줍니다.
 */
export const sanitizePersonalParameters = (
  parameterFieldList: ParameterField[]
) => {
  // NOTE: autoFillParameter은 #{NAME}, #{OTHER_NAME}이 둘 다 있어야 사용자에게 보여진다.
  if (parameterFieldList.length !== 2) return []

  const parameterFieldSet = parameterFieldList
    .map((v) => v.key)
    .reduce((acc, v) => {
      acc.add(v)

      return acc
    }, new Set<string>())
  if (parameterFieldSet.size !== 2) return []

  const validatedParameterFieldList = parameterFieldList.filter((v) =>
    isAutoFillParameter(v.key)
  )
  if (validatedParameterFieldList.length !== 2) {
    return []
  }

  return parameterFieldList
}
