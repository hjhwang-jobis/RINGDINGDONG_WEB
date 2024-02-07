import { MessageGroup } from '~/types'

export interface SelectedMessageGroupTemplate {
  templateCode: string
  text: string
}

export interface FormMessageGroupTemplate {
  templateCode: string
  parameterRows: ParameterRow[]
  isContainAlimlist: boolean
}

export interface ParameterRow {
  key: string
  value: string
}

export type FormData = MessageGroup & {
  formMessageGroupTemplates: FormMessageGroupTemplate[]
}
