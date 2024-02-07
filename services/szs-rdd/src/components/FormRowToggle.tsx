import { ColumnFlex, Flex, Text } from '@3o3/mystique-components'
import { Toggle } from '@fe3o3/ui'
import React, { BaseSyntheticEvent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  name: string
  labelOn: string
  labelOff: string
  disabled?: boolean
}

export default function FormRowToggle({
  name,
  labelOn,
  labelOff,
  disabled = false,
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <ColumnFlex gap="32px">
            <Flex.CenterVertical>
              <Toggle
                checked={field.value}
                onChange={(e: BaseSyntheticEvent) => {
                  if (!e.target || e.target.checked === field.value) return

                  field.onChange(e)
                }}
                disabled={disabled}
              />
              <Text typography="body16">
                &nbsp;{field.value ? labelOn : labelOff}
              </Text>
            </Flex.CenterVertical>
          </ColumnFlex>
        )
      }}
    />
  )
}
