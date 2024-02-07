import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'
import React, { BaseSyntheticEvent } from 'react'

type Value = string | number
export type Option = {
  label: string
  value: Value
}

interface Props {
  options: Option[]
  value: Value
  name?: string
  onChange: (value: Value) => void
  onBlur?: (value: Value) => void
  disabled?: boolean
}

export const createOption = (label: string, value: Value): Option => ({
  label,
  value,
})

function SelectBox({
  options,
  value,
  name,
  onChange,
  onBlur,
  disabled = false,
}: Props) {
  return (
    <StyledSelect
      value={value}
      name={name ?? ''}
      onChange={(e: BaseSyntheticEvent) => onChange(e.target.value)}
      onBlur={(e: BaseSyntheticEvent) => {
        if (onBlur) onBlur(e.target.value)
      }}
      disabled={disabled}
    >
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        )
      })}
    </StyledSelect>
  )
}

export default SelectBox

const StyledSelect = styled.select`
  display: block;
  padding: 6px 12px;
  font-size: 1rem;
  line-height: 1.42857143;
  color: ${colors.light.scheme.$gray60};
  background-color: ${colors.light.scheme.$white};
  border: 1px solid ${colors.light.scheme.$gray30};
  border-radius: 4px;
`
