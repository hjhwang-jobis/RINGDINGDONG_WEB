import {
  GetAlimtalkActivate,
  GetAlimtalkTemplates,
  GetAlimtalkTemplatesList,
  GetAlimtalkTemplatesMatchedParameters,
  GetAlimtalkTemplatesParameters,
} from '~/types/api'

const alimtalk = {
  BASE: ['ALIMTALK'],
  getAlimtalkTemplatesList: (params: GetAlimtalkTemplatesList.Request) => [
    ...alimtalk.BASE,
    'getAlimtalkTemplatesList',
    params,
  ],
  getAlimtalkTemplates: (params: GetAlimtalkTemplates.Request) => [
    ...alimtalk.BASE,
    'getAlimtalkTemplates',
    params,
  ],
  getAlimtalkTemplatesParameters: (
    params: GetAlimtalkTemplatesParameters.Request
  ) => [...alimtalk.BASE, 'getAlimtalkTemplatesParameters', params],
  getAlimtalkTemplatesMatchedParameters: (
    params: GetAlimtalkTemplatesMatchedParameters.Request
  ) => [...alimtalk.BASE, 'getAlimtalkTemplatesMatchedParameters', params],
  getAlimtalkActivate: (params: GetAlimtalkActivate.Request) => [
    ...alimtalk.BASE,
    'getAlimtalkActivate',
    params,
  ],
} as const

export default alimtalk
