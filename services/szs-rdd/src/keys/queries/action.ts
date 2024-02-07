import { GetActions, GetActionsList } from '~/types/api'

const action = {
  BASE: ['ACTION'],
  getActionsList: (params: GetActionsList.Request) => [
    ...action.BASE,
    'getActionsList',
    params,
  ],
  getActions: (params: GetActions.Request) => [
    ...action.BASE,
    'getActions',
    params,
  ],
} as const

export default action
