import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import SelectBox, { Option } from '~/components/SelectBox'
import { validators } from '~/utils'

interface Props {
  name: string
  options: Option[]
  validate?: (v: string) => string | true
  disabled?: boolean
  onBlur?: () => void
}

export default function FormRowSelect({
  name,
  options,
  validate = (v) => validators.run([validators.validateInRulesRequired(v)]),
  disabled = false,
  onBlur: onBlurFromProps,
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate,
      }}
      render={({
        field: { value, name, onChange, onBlur },
        fieldState: { invalid },
      }) => (
        <SelectBox
          options={options}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={() => {
            if (invalid) return
            onBlur()
            onBlurFromProps?.()
          }}
          disabled={disabled}
        />
      )}
    />
  )
}
