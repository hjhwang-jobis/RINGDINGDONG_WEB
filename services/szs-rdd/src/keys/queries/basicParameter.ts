import { GetParametersBasics, GetParametersBasicsList } from '~/types/api'

const parameter = {
  BASE: ['BASIC_PARAMETER'],
  getParametersBasicsList: (params: GetParametersBasicsList.Request) => [
    ...parameter.BASE,
    'getParametersBasicsList',
    params,
  ],
  getParametersBasics: (params: GetParametersBasics.Request) => [
    ...parameter.BASE,
    'getParametersBasics',
    params,
  ],
} as const

export default parameter
