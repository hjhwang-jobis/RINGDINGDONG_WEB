import { format } from 'date-fns'

import { DATE_FORMAT_YYYY_MM_DD, TIME_FORMAT_HH_MM } from '~/constants'

export const toYYYYMMDDHHmm = (v: string) =>
  format(new Date(v), `${DATE_FORMAT_YYYY_MM_DD} ${TIME_FORMAT_HH_MM}`)
