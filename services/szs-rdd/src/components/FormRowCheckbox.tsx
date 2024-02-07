import { Checkbox } from '@fe3o3/ui'
import { Controller, useFormContext } from 'react-hook-form'

import { validators } from '~/utils'

interface Props {
  name: string
  label: string
  disabled?: boolean
}

export default function FormRowCheckbox({
  name,
  label,
  disabled = false,
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (v) => validators.run([validators.validateInRulesBoolean(v)]),
      }}
      render={({ field }) => (
        <Checkbox
          label={label}
          checked={field.value}
          onCheck={field.onChange}
          disabled={disabled}
        />
      )}
    />
  )
}
