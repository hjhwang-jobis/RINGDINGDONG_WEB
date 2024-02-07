import { Flex, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { isValid } from 'date-fns'
import { HTMLAttributes, useState } from 'react'

import { DoubleDigitInput } from '~/components/TimeInput'

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** yyyy-MM-dd */
  defaultValue?: string
  onChange: (value: string) => void
  disabled?: boolean
}

const DateInput = ({ defaultValue, onChange, disabled = false }: Props) => {
  const defaultDate = defaultValue?.split('-') || []
  const [date, setDate] = useState({
    year: defaultDate[0]?.slice(2) || '',
    month: defaultDate[1] || '',
    date: defaultDate[2] || '',
  })

  const handleChange = (value: string, key: string) => {
    const newDate = {
      ...date,
      [key]: value,
    }

    setDate(newDate)

    const dateStr = [
      `20${newDate.year}`,
      '-',
      `${newDate.month.padStart(2, '0')}`,
      '-',
      `${newDate.date.padStart(2, '0')}`,
    ]
      .join('')
      .trim()

    if (isValid(new Date(dateStr))) {
      onChange(dateStr)
    }
  }

  const yearHasError = date.year === '' || +date.year > 99
  const monthHasError = !+date.month || +date.month > 12
  const dateHasError = !+date.date || +date.date > 31

  return (
    <>
      <Flex justifyContent="start" alignItems="center">
        <Text
          typography="subtitle20"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          20
        </Text>
        <DoubleDigitInput
          value={date.year}
          disabled={disabled}
          onChange={(v) => {
            handleChange(v, 'year')
          }}
          min={23}
          max={99}
          hasError={yearHasError}
        />
        <Text
          typography="subtitle20"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          년 /
        </Text>
        <DoubleDigitInput
          value={date.month}
          disabled={disabled}
          onChange={(v) => {
            handleChange(v, 'month')
          }}
          min={1}
          max={12}
          hasError={monthHasError}
        />
        <Text
          typography="subtitle20"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          월 /
        </Text>
        <DoubleDigitInput
          value={date.date}
          disabled={disabled}
          onChange={(v) => {
            handleChange(v, 'date')
          }}
          min={1}
          max={31}
          hasError={dateHasError}
        />
        <Text
          typography="subtitle20"
          weight="medium"
          color={colors.light.scheme.$gray40}
        >
          일
        </Text>
      </Flex>
    </>
  )
}

export default DateInput
