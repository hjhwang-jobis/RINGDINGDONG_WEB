import { GetParametersPersonalsList } from '~/types/api'

const parameter = {
  BASE: ['PERSONAL_PARAMETER'],
  getParametersPersonalsList: (params: GetParametersPersonalsList.Request) => [
    ...parameter.BASE,
    'getParametersPersonalsList',
    params,
  ],
} as const

export default parameter
