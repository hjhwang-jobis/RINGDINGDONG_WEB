import { BasicTextArea, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { validators } from '~/utils'

interface Props {
  name: string
  min?: number
  max?: number
  disabled?: boolean
  onBlur?: () => void
}

export default function FormRowTextArea({
  name,
  min = 5,
  max = 400,
  disabled = false,
  onBlur,
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (v) =>
          validators.run([validators.validateInRulesStrMinMax(v, min, max)]),
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <BasicTextArea
              {...field}
              value={field.value ?? ''}
              placeholder="기록할 내용을 입력하세요"
              isExtend
              maxLength={max}
              disabled={disabled}
              onBlur={() => onBlur?.()}
            />
            {error?.message && (
              <>
                <Spacing px={10} />
                <Text
                  typography="body14"
                  weight="regular"
                  color={colors.light.scheme.$red60}
                >
                  {error?.message}
                </Text>
              </>
            )}
          </>
        )
      }}
    />
  )
}
