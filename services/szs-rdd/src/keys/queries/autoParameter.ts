import { GetParametersBasicsList } from '~/types/api'

const parameter = {
  BASE: ['AUTO_PARAMETER'],
  getParametersAutosList: (params: GetParametersBasicsList.Request) => [
    ...parameter.BASE,
    'getParametersAutosList',
    params,
  ],
} as const

export default parameter
