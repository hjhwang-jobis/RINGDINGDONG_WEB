import { GetDoneMessageGroupsList, GetMessageGroups } from '~/types/api'

const messageGroups = {
  BASE: ['MESSAGE_GROUPS'],
  getMessageGroups: (params: GetMessageGroups.Request) => [
    ...messageGroups.BASE,
    'getMessageGroups',
    params,
  ],
  getDoneMessageGroupsList: (params: GetDoneMessageGroupsList.Request) => [
    ...messageGroups.BASE,
    'getDoneMessageGroupsList',
    params,
  ],
} as const

export default messageGroups
