import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import SelectBox from '~/components/SelectBox'
import { SendProfileOptions } from '~/constants'

interface Props {
  name: string
  disabled?: boolean
}

export default function FormRowSelectSendProfile({
  name,
  disabled = false,
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (v) => {
          if (!v) {
            return '발신프로필이 설정되지 않았습니다.'
          }
        },
      }}
      render={({
        field: { value, name, onChange, onBlur },
        fieldState: { invalid },
      }) => (
        <SelectBox
          options={SendProfileOptions}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={() => {
            if (invalid) return
            onBlur()
          }}
          disabled={disabled}
        />
      )}
    />
  )
}
