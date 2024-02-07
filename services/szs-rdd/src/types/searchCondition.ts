import { PageSizes, SortDirection } from '~/constants'

export interface Sorting<T> {
  sortableColumn?: T
  sortColumn?: T
  sortDirection: SortDirection
}

export interface Paging<T extends readonly number[] = number[]> {
  page: number
  size: PageSize<T>
}

export type PageSize<T extends readonly number[] = typeof PageSizes> = T[number]
