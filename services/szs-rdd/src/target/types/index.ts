import { Author } from '~/types'
import { GetTargets } from '~/types/api'

export type TargetQueryFormType = GetTargets.TargetQuery & {
  isIncluded: boolean
}

export type DoneMessageFormType = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  isIncluded: boolean
}

export interface FormTarget {
  id?: number
  targetId?: string
  title: string
  isDropDuplicated: boolean
  isExcludeDeniers: boolean
  createdAt?: string
  updatedAt?: string
  author?: Author
  frequencies: GetTargets.Frequency[]
  targetQueries: TargetQueryFormType[]
  doneMessages: DoneMessageFormType[]
}
