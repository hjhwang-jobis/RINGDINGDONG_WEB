import { GetTargetsQueries, GetTargetsQueriesList } from '~/types/api'

const targetQuery = {
  BASE: ['TARGET_QUERY'],
  getTargetsQueriesList: (params: GetTargetsQueriesList.Request) => [
    ...targetQuery.BASE,
    'getTargetsQueriesList',
    params,
  ],
  getTargetsQueries: (params: GetTargetsQueries.Request) => [
    ...targetQuery.BASE,
    'getTargetsQueries',
    params,
  ],
} as const

export default targetQuery
