import { BasicInputField } from '@3o3/mystique-components'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  name: string
  placeholder?: string
  validateInRules?: (v: string) => string | true
  disabled?: boolean
  onBlur?: (v: string) => void
  type?: 'text' | 'number'
}

export default function FormRowBasicInputField({
  name,
  placeholder,
  validateInRules,
  disabled,
  onBlur,
  type = 'text',
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: validateInRules,
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <BasicInputField
            {...field}
            type={type}
            fullWidth
            value={field.value ?? ''}
            hasResetButton
            placeholder={placeholder ?? ''}
            hasError={!!error?.message}
            description={error?.message}
            disabled={!!disabled}
            onChange={(e) => {
              if (field.value === e.target.value) {
                return
              }
              // NOTE: 아래 if 구문을 삭제하면, type='number'인 조건에 input2 컴포넌트에서 useEffect 내의 useState의 재귀호출 문제가 발생합니다.
              if (type === 'number') {
                field.onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value:
                      e.target.value === '' ? '0' : `${Number(e.target.value)}`,
                  },
                })

                return
              }
              field.onChange(e)
            }}
            onBlur={() => {
              field.onBlur()
              onBlur?.(field.value)
            }}
          />
        )
      }}
    />
  )
}
