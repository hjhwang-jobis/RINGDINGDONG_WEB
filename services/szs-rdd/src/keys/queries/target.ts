import { GetTargets, GetTargetsList } from '~/types/api'

const target = {
  BASE: ['TARGET'],
  getTargets: (params: GetTargets.Request) => [
    ...target.BASE,
    'getTargets',
    params,
  ],
  getTargetsList: (params: GetTargetsList.Request) => [
    ...target.BASE,
    'getTargetsList',
    params,
  ],
} as const

export default target
