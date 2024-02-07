import { AlimlistTemplateNotificationType } from '~/alimlist/constants'
import { ParameterMap } from '~/types'
import { PostAlimlistTemplates } from '~/types/api'
export interface FormAlimlistTemplate {
  templateCode: string
  title: string
  subTitle: string
  imageUrl: string
  buttonRequests: PostAlimlistTemplates.AlimlistTemplateButtonRequest[]
  notificationType: AlimlistTemplateNotificationType
  requestParameter: string[]
  autoFillParameter: ParameterMap
}
