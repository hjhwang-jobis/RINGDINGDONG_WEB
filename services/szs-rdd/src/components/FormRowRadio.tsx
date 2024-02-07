import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { validators } from '~/utils'

import RadioField, { Option } from './RadioField'

interface Props<T> {
  name: string
  options: Option<T>[]
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: T) => void
}

export default function FormRowRadio<T>({
  name,
  options,
  disabled = false,
  readOnly = false,
  onChange,
}: Props<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (v) =>
          validators.run([validators.validateInRulesRequired(v)]),
      }}
      render={({ field }) => (
        <RadioField
          options={options}
          value={field.value}
          onChange={(v) => {
            field.onChange(v)
            onChange?.(v)
          }}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    />
  )
}
