// NOTE: 텍스트 치환(기본, 자동계산, 개인정보 파라미터) 관련 유틸입니다.

import { ParameterType } from '~/alimtalk/constants'
import { FriendtalkTemplateType } from '~/friendtalk/constants'
import {
  ContentTypeBase,
  ContentTypeCarousel,
  ContentTypeWideImage,
  ContentTypeWideList,
} from '~/friendtalk/types'
import { ParameterField, ParameterMap } from '~/types'
import { GetFriendtalkTemplates } from '~/types/api'
import {
  GetAlimlistTemplates,
  GetAlimtalkTemplates,
  GetAlimtalkTemplatesMatchedParameters,
  GetPushTemplates,
  PostAlimlistTemplates,
} from '~/types/api'

import {
  convertToAutoFillParameter,
  createAutoFillParameterFieldListFromText,
} from './autoFillParameterUtils'
import { isAutoFillParameter } from './autoFillParameterUtils'
import { createRequestParameterFromText } from './requestParameterUtils'

type AlimtalkMatchedParameterInfo =
  GetAlimtalkTemplatesMatchedParameters.AlimtalkMatchedParameterInfo

/**
 * 인자로 받은 문자열안의 링딩동의 Form의 "치환가능 문자열 변수(replaceableTextVariable)" 패턴에 맞는 단어를 검색하여 배열로 돌려줍니다.
 * @param {string} v 검사할 문자열
 * @returns {string[]} 치환가능 문자열 변수(replaceableTextVariable)의 배열
 */
export const findReplaceableTextVariableList = (v: string): string[] => {
  const regexp = /\#\{[A-Z0-9_]{1,30}\}/g
  const result = [...v.matchAll(regexp)]
  const matches = result.map((match) => match[0])
  const uniqueKeys = Object.keys(
    matches.reduce(
      (acc, v) => ({
        ...acc,
        [v]: true,
      }),
      {}
    )
  )

  return uniqueKeys
}

/**
 * 알림톡의 문자열안의 파라미터 대상 단어들을 찾아 돌려줍니다.
 * @param {string} v 검사할 문자열. 알림톡의 파라미터 범위는 한글,문자,숫자,언더바까지 포함입니다.
 * @returns {string[]} 치환가능 문자열 변수(parameter)의 배열
 */
export const findAlimtalkParameters = (v: string): string[] => {
  const regexp = /\#\{[\w\dㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,30}\}/g
  const result = [...v.matchAll(regexp)]
  const matches = result.map((match) => match[0])
  const uniqueKeys = Object.keys(
    matches.reduce(
      (acc, v) => ({
        ...acc,
        [v]: true,
      }),
      {}
    )
  )

  return uniqueKeys
}

/**
 * React Hook Form의 autoFillParameter와 requestParameter를 업데이트합니다.
 * @param {string} texts 자동치환 가능한 키워드가 포함되어있는 텍스트
 * @param {AutoFillParameterField[]} autoFillParameterFieldList 자동치환 키워드 객체
 * @param {(autoFillParameter: AutoFillParameter) => void} setValueAutoFillParameter autoFillParameter를 설정합니다.
 * @param {(requestParameter: string[]) => void} setValueRequestParameter requestParameter를 설정합니다.
 * @param {(autoFillParameterList: AutoFillParameterField[]) => void} replaceAutoFillParameterFieldArray AutoFillParameterField[]를 설정합니다.
 * @returns {void} 리턴값 없음
 */
interface updateAutoFillNRequestParametersProps {
  getTexts: () => string
  getAutoFillParameterFieldList: () => ParameterField[]
  setValueAutoFillParameter: (autoFillParameter: ParameterMap) => void
  setValueRequestParameter: (requestParameter: string[]) => void
  replaceAutoFillParameterFieldArray: (
    autoFillParameterFieldList: ParameterField[]
  ) => void
}
export const updateAutoFillNRequestParameters = ({
  getTexts,
  getAutoFillParameterFieldList,
  setValueAutoFillParameter,
  setValueRequestParameter,
  replaceAutoFillParameterFieldArray,
}: updateAutoFillNRequestParametersProps) => {
  const texts = getTexts()
  const autoFillParameterFieldList = getAutoFillParameterFieldList()

  // 1. Form에서 사용자가 입력한 autoFillParameters 만들어내기
  const autoFillParameter = convertToAutoFillParameter(
    autoFillParameterFieldList
  )

  // 2. texts에서 자동치환자 목록만들기(사용자가 입력한 값을 주입합니다)
  const autoFillParameterFieldListUpdated =
    createAutoFillParameterFieldListFromText(texts).map(({ key, value }) => ({
      key,
      value: autoFillParameter[extractReplaceableKey(key)] ?? value,
    }))

  // 3. 업데이트된 자동치환자 목록을 Form에 업데이트합니다.
  replaceAutoFillParameterFieldArray(autoFillParameterFieldListUpdated)
  setValueAutoFillParameter(
    convertToAutoFillParameter(autoFillParameterFieldListUpdated)
  )

  // 4. requestparameter 설정하기
  setValueRequestParameter(createRequestParameterFromText(texts))
}

/**
 * 자동치환자 배열을 자동치환자 맵으로 바꿔줍니다.
 * @param {AutoFillParameterField[]} autoFillParameterFieldList 자동치환 객체목록
 * @returns {AutoFillParameter} 지동정보치환맵. 현재는 개인정보치환만 한다. NAME만 지원한다. 홈택스 조회를 안한사람들이 대상. 이 경우 기본값을 써야하므로 맵형태로 키와 기본값을 관리함.
 */
export const convertToReplacableParameterMap = (
  list: ParameterField[]
): ParameterMap =>
  list.reduce((acc, v) => {
    return {
      ...acc,
      [v.key]: v.value,
    }
  }, {})

export const extractReplaceableKey = (v: string) => {
  // NOTE: #{NAME}에서 NAME을 추출해냅니다.
  const regexp = /[A-Z0-9_]{1,30}/g
  const result = [...v.matchAll(regexp)]
  const matches = result.map((match) => match[0])
  const key = matches[0]

  return key
}

/**
 * 자동계산, 개인정보, 기본 파라미터(auto/personal/basic parameter)를 추출할 친구톡의 텍스트를 추출합니다.
 * @param {FriendtalkTemplate} friendtalkTemplate 친구톡 템플릿
 * @returns {string} 파라미터를 포함하고 있는 모든 텍스트 조합
 */
export const extractTextFromFriendtalkTemplate = (
  friendtalkTemplate: GetFriendtalkTemplates.FriendtalkTemplate
): string => {
  switch (friendtalkTemplate.templateType) {
    case FriendtalkTemplateType.BASE:
      const contentTypeBase: ContentTypeBase = JSON.parse(
        friendtalkTemplate.content
      )

      return contentTypeBase.comment
    case FriendtalkTemplateType.WIDE_IMAGE:
      const contentTypeWideImage: ContentTypeWideImage = JSON.parse(
        friendtalkTemplate.content
      )

      return contentTypeWideImage.comment
    case FriendtalkTemplateType.WIDE_LIST:
      const contentTypeWideList: ContentTypeWideList = JSON.parse(
        friendtalkTemplate.content
      )

      return contentTypeWideList.items.map((v) => v.title).join('')
    case FriendtalkTemplateType.CAROUSEL:
      const contentTypeCarousel: ContentTypeCarousel = JSON.parse(
        friendtalkTemplate.content
      )

      return contentTypeCarousel.items
        .map((v) => `${v.header}${v.message}`)
        .join('')
    default:
      return ''
  }
}

/**
 * 자동계산, 개인정보, 기본 파라미터(auto/personal/basic parameter)를 추출할 푸시 메시지그룹 템플릿의 텍스트를 추출합니다.
 * @param {GetPushTemplates.PushTemplate} pushTemplate 친구톡 템플릿
 * @returns {string} 파라미터를 포함하고 있는 모든 텍스트 조합
 */
export const extractTextFromPushTemplate = (
  pushTemplate: GetPushTemplates.PushTemplate
) => [pushTemplate.title, pushTemplate.body].join('')

/**
 * 자동계산, 개인정보, 기본 파라미터(auto/personal/basic parameter)를 추출할 알림리스트 메시지그룹 템플릿의 텍스트를 추출합니다.
 * @param {GetAlimlistTemplates.AlimlistTemplate} pushTemplate 친구톡 템플릿
 * @returns {string} 파라미터를 포함하고 있는 모든 텍스트 조합
 */
export const extractTextFromAlimlistTemplate = (
  alimlistTemplate: GetAlimlistTemplates.AlimlistTemplate
) => {
  const buttonRequests: PostAlimlistTemplates.AlimlistTemplateButtonRequest[] =
    JSON.parse(alimlistTemplate.button)
  const textFromButtons = buttonRequests
    .map((v) => `${v.landingUrl}${v.description}`)
    .join('')

  return [
    (alimlistTemplate.title,
    alimlistTemplate.subTitle,
    alimlistTemplate.detail,
    textFromButtons),
  ].join('')
}

/**
 * 자동계산, 개인정보, 기본 파라미터(auto/personal/basic parameter)를 추출할 알림톡 메시지그룹 템플릿의 텍스트를 추출합니다.
 * @param {GetAlimtalkTemplates.AlimtalkTemplate} alimtalkTemplate 알림톡 템플릿
 * @returns {string} 파라미터를 포함하고 있는 모든 텍스트 조합
 */
export const extractTextFromAlimtalkTemplate = (
  alimtalkTemplate: GetAlimtalkTemplates.AlimtalkTemplate
) =>
  [
    alimtalkTemplate.templateExtra,
    alimtalkTemplate.templateTitle,
    alimtalkTemplate.templateSubtitle,
    alimtalkTemplate.content,
    alimtalkTemplate.buttons,
  ].join('')

/**
 * 파라미터 타입에 따른 알림톡의 매칭 파라미터 정보를 필터링해 가져옵니다. 이 때, 중복된 키는 제거해서 고유한(unique)한 키 목록을 돌려줍니다.
 * @param {ParameterType} parameterType 치환 가능한 파라미터 타입
 * @param {AlimtalkMatchedParameterInfo[]} matchedInfos 알림톡 매칭 파라미터 목록
 * @returns {ParameterField[]} key, value 쌍을 가지는 객체
 */
export const getUniqueParameterFieldsFromMatchedInfos = (
  parameterType: ParameterType,
  matchedInfos: AlimtalkMatchedParameterInfo[]
): ParameterField[] => {
  const parameterSet = matchedInfos
    .filter((v) => v.parameterType === parameterType)
    .reduce((acc, v) => {
      acc.add(v.matchedParameter)

      return acc
    }, new Set<string>())

  const uniqueParameters = Array.from(parameterSet).map((v: string) => ({
    key: v,
    value: '',
  }))

  if (parameterType === ParameterType.PERSONAL) {
    const uniquePersonalParameters = uniqueParameters.filter((v) =>
      isAutoFillParameter(v.key)
    )
    if (uniquePersonalParameters.length === 2) {
      // NOTE: autoFillParameter은 #{NAME}, #{OTHER_NAME}이 둘 다 있어야 사용자에게 보여진다.
      return uniquePersonalParameters
    }

    return []
  }

  return uniqueParameters
}
