export const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection]
