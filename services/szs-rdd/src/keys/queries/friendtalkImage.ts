import { GetFriendtalkTemplatesImagesList } from '~/types/api'

const friendtalkImage = {
  BASE: ['FRIEND_TALK_IMAGES'],
  getFriendtalkTemplateImagesList: (
    params: GetFriendtalkTemplatesImagesList.Request
  ) => [...friendtalkImage.BASE, 'getFriendtalkTemplateImagesList', params],
} as const

export default friendtalkImage
