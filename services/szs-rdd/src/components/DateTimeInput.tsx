import { Flex } from '@3o3/mystique-components'
import { format, isValid } from 'date-fns'
import React, { useCallback, useRef } from 'react'

import DateInput from '~/components/DateInput'
import TimeInput from '~/components/TimeInput'
import { DATE_FORMAT_YYYY_MM_DD, TIME_FORMAT_HH_MM } from '~/constants'

interface Props {
  onChange: (datetime: string) => void
  value?: string
  disabled?: boolean
}

export default function DateTimeInput({
  onChange: onChangeFromProps,
  value = format(new Date(), `${DATE_FORMAT_YYYY_MM_DD} ${TIME_FORMAT_HH_MM}`),
  disabled = false,
}: Props) {
  const date = new Date(value)
  const now = new Date()
  const isValidInput = isValid(date)
  const dateRef = useRef(
    isValidInput
      ? format(date, DATE_FORMAT_YYYY_MM_DD)
      : format(now, DATE_FORMAT_YYYY_MM_DD)
  )
  const timeRef = useRef(
    isValidInput
      ? format(date, TIME_FORMAT_HH_MM)
      : format(now, TIME_FORMAT_HH_MM)
  )

  const onChange = useCallback(() => {
    const date = dateRef.current
    const time = timeRef.current
    const dateTimeStr = `${date} ${time}`
    const dateOnlyLength = 11
    if (dateTimeStr.length > dateOnlyLength && isValid(new Date(dateTimeStr))) {
      onChangeFromProps(dateTimeStr)
    }
  }, [onChangeFromProps])

  return (
    <Flex justifyContent="start">
      <DateInput
        defaultValue={dateRef.current}
        onChange={(v) => {
          dateRef.current = v
          onChange()
        }}
        disabled={disabled}
      />
      <TimeInput
        defaultValue={timeRef.current}
        onChange={(v) => {
          timeRef.current = v
          onChange()
        }}
        disabled={disabled}
      />
    </Flex>
  )
}
