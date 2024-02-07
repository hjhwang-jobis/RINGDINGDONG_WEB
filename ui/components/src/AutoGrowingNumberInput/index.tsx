import { extractDigits } from '@3o3/utils'
import { AutoGrowingInput, AutoGrowingInputProps } from '@fe3o3/ui'
import React, { ChangeEvent, useCallback } from 'react'

import { filterInputValue } from '~/shared/utils/input'

export interface AutoGrowingNumberInputProps extends AutoGrowingInputProps {
  allowMinus?: boolean
}

function AutoGrowingNumberInput({
  onChange,
  allowMinus,
  ...rest
}: AutoGrowingNumberInputProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { filteredValue, selectionStart, selectionEnd } = filterInputValue(
        e,
        (value) => {
          const digits = extractDigits(value, allowMinus)

          return digits ? Number(digits).toString() : digits
        }
      )

      e.target.value = filteredValue
      e.target.selectionStart = selectionStart
      e.target.selectionEnd = selectionEnd

      onChange?.(e)
    },
    [allowMinus, onChange]
  )

  return (
    <AutoGrowingInput {...rest} inputMode="numeric" onChange={handleChange} />
  )
}

export default AutoGrowingNumberInput
