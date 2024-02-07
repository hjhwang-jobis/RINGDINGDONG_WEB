import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { isValid } from 'date-fns'
import { Controller, useFormContext } from 'react-hook-form'

import DateTimeInput from '~/components/DateTimeInput'

interface Props {
  name: string
  disabled?: boolean
}

export default function FormRowDateTimeInput({
  name,
  disabled = false,
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (v) => {
          if (isValid(new Date(v)) && v.length >= 16) return true

          return '유효한 시간값이 아닙니다. yyyy-MM-dd HH:mm의 형식으로 입력했는지 확인해주세요.'
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <>
            <DateTimeInput
              value={field.value ?? ''}
              onChange={(v) => {
                field.onChange(v)
              }}
              disabled={disabled}
            />
            {fieldState.error ? (
              <>
                <Spacing px={10} />
                <Text
                  typography="body14"
                  weight="regular"
                  color={colors.light.scheme.$red60}
                >
                  {fieldState.error.message}
                </Text>
              </>
            ) : null}
          </>
        )
      }}
    />
  )
}
