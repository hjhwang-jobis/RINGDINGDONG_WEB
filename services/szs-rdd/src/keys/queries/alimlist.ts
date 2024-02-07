import { GetAlimlistTemplates, GetAlimlistTemplatesList } from '~/types/api'

const alimlist = {
  BASE: ['ALIMLIST'],
  getAlimlistTemplatesList: (params: GetAlimlistTemplatesList.Request) => [
    ...alimlist.BASE,
    'getAlimlistTemplatesList',
    params,
  ],
  getAlimlistTemplates: (params: GetAlimlistTemplates.Request) => [
    ...alimlist.BASE,
    'getAlimlistTemplates',
    params,
  ],
} as const

export default alimlist
