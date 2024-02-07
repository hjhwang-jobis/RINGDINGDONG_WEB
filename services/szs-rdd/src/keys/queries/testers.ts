import { GetTesters, GetTestersList } from '~/types/api'

const tester = {
  BASE: ['TESTER'],
  getTestersList: (params: GetTestersList.Request) => [
    ...tester.BASE,
    'getTestersList',
    params,
  ],
  getTesters: (params: GetTesters.Request) => [
    ...tester.BASE,
    'getTesters',
    params,
  ],
} as const

export default tester
