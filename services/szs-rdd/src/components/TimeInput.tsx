import { Flex, Text } from '@3o3/mystique-components'
import { BasicInputField } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import React, { HTMLAttributes, useState } from 'react'

import { TIME_FORMAT_HH_MM } from '~/constants'

interface TimeInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  labelHour?: string
  labelMinute?: string
  hourPlaceholder?: string
  minutePlaceholder?: string
  defaultValue?: string
  onChange: (v: string) => void
  disabled?: boolean
}

const getTimeString = (hour: string, minute: string) => {
  const hh = !hour ? '' : hour.padStart(2, '0')
  const mm = !minute ? '' : minute.padStart(2, '0')

  return `${hh}:${mm}`
}

const isValidHour = (hour: string | null) => !!hour && +hour <= 23
const isValidMinute = (minute: string | null) => !!minute && +minute <= 59

interface TimeDigitInputProps {
  value: string
  disabled: boolean
  hasError: boolean
  onChange: (v: string) => void
  min: number
  max: number
}
export function DoubleDigitInput({
  value,
  disabled,
  onChange,
  hasError,
  min,
  max,
}: TimeDigitInputProps) {
  return (
    <InputWrapper>
      <BasicInputField
        type="number"
        value={value}
        disabled={disabled}
        hasError={hasError}
        fullWidth
        onChange={(e) => {
          const value = e.target.value
          const num = Number(value)
          if (num < min) {
            onChange(`${min}`.padStart(2, '0'))

            return
          }
          if (num > max) {
            onChange(`${max}`)

            return
          }
          if (num < 10) {
            onChange(`${num}`.padStart(2, '0'))

            return
          }
          onChange(`${num}`)
        }}
      />
    </InputWrapper>
  )
}

const TimeInput = ({
  labelHour = '시 :',
  labelMinute = '분',
  defaultValue = format(new Date(), TIME_FORMAT_HH_MM),
  onBlur,
  onChange,
  disabled = false,
  ...rest
}: TimeInputProps) => {
  const timeTexts = defaultValue.split(':')
  const [time, setTime] = useState({
    hour: timeTexts[0],
    minute: timeTexts[1],
  })

  const handleChange = (value: string, key: string) => {
    const newTime = {
      ...time,
      [key]: value,
    }

    setTime(newTime)

    if (isValidHour(newTime.hour) && isValidMinute(newTime.minute)) {
      onChange(getTimeString(newTime.hour, newTime.minute).trim())
    }
  }

  const hourHasError = !isValidHour(time.hour)
  const minuteHasError = !isValidMinute(time.minute)

  return (
    <div {...rest}>
      <Flex justifyContent="start" alignItems="center">
        <DoubleDigitInput
          value={time.hour}
          disabled={disabled}
          onChange={(v) => {
            handleChange(v, 'hour')
          }}
          min={0}
          max={23}
          hasError={hourHasError}
        />
        <Text
          typography="subtitle20"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          {labelHour}
        </Text>
        <DoubleDigitInput
          value={time.minute}
          disabled={disabled}
          onChange={(v) => {
            handleChange(v, 'minute')
          }}
          min={0}
          max={59}
          hasError={minuteHasError}
        />
        <Text
          typography="subtitle20"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          {labelMinute}
        </Text>
      </Flex>
    </div>
  )
}

const InputWrapper = styled.div`
  width: 58px;
`

export default TimeInput
