import { GetFriendtalkTemplates, GetFriendtalkTemplatesList } from '~/types/api'

const friendtalk = {
  BASE: ['FRIEND_TALK'],
  getFriendtalkTemplatesList: (params: GetFriendtalkTemplatesList.Request) => [
    ...friendtalk.BASE,
    'getFriendtalkTemplatesList',
    params,
  ],
  getFriendtalkTemplates: (params: GetFriendtalkTemplates.Request) => [
    ...friendtalk.BASE,
    'getFriendtalkTemplates',
    params,
  ],
} as const

export default friendtalk
