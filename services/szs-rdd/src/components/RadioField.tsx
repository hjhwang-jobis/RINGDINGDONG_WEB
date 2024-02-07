import { Flex } from '@3o3/mystique-components'
import { css } from '@emotion/react'
import { Radio, Typo, typoStyle } from '@fe3o3/ui'
import React, { useCallback } from 'react'

export interface Option<T = any> {
  value: T
  label: string
}

interface Props<T> {
  options: Option<T>[]
  value: T
  disabled?: boolean
  readOnly?: boolean
  onChange: (value: T) => void
}

function RadioField<T>({
  options,
  value,
  disabled = false,
  readOnly = false,
  onChange,
}: Props<T>) {
  const handleSelect = useCallback(
    (value: T) => () => onChange(value),
    [onChange]
  )

  return (
    <Flex
      gap="12px"
      css={css`
        cursor: ${(readOnly || disabled) && 'not-allowed'};
        pointer-events: ${(readOnly || disabled) && 'none'};
      `}
    >
      {options.map((option, index) => (
        <Radio
          css={css`
            ${typoStyle.S2}
            font-weight: 500;
          `}
          readOnly={readOnly}
          disabled={disabled}
          key={`${option.value}-${index}`}
          label={<Typo type="S2">{option.label}</Typo>}
          checked={option.value === value}
          onCheck={handleSelect(option.value)}
        />
      ))}
    </Flex>
  )
}

export default RadioField
