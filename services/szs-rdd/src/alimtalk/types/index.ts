import { ParameterType } from '~/alimtalk/constants'

export interface AlimtalkMatchDetail {
  parameterType: ParameterType
  originParameter: string
  matchedParameter: string
  defaultValue: string
}
