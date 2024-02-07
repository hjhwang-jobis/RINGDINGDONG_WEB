import { format } from 'date-fns'
import subDays from 'date-fns/subDays'

import { DAYS_IN_5YEARS, yyyy_MM_dd } from '~/constants'
import { ApiError } from '~/types/api'

export const getDefaultSearchStartDate = () =>
  format(subDays(new Date(), DAYS_IN_5YEARS), yyyy_MM_dd)

export function getApiErrorMessage(
  error?: ApiError | null,
  defaultMessage = '알 수 없는 오류가 발생했습니다'
) {
  if (!error) return defaultMessage

  let errorMessage = error.message

  if (error.validations && error.validations.length > 0) {
    errorMessage = errorMessage.concat(
      '\n',
      ...error.validations.map((validation) => `\n${validation.message}`)
    )
  }

  return error.code ? `[${error.code}] ${errorMessage}` : errorMessage
}
