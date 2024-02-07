import { GetPushTemplates, GetPushTemplatesList } from '~/types/api'

const push = {
  BASE: ['PUSH'],
  getPushTemplatesList: (params: GetPushTemplatesList.Request) => [
    ...push.BASE,
    'getPushTemplates',
    params,
  ],
  getPushTemplates: (params: GetPushTemplates.Request) => [
    ...push.BASE,
    'getPushTemplates',
    params,
  ],
} as const

export default push
