import { extractDigits } from '@3o3/utils'
import { Input2 as Input, TypoProps } from '@fe3o3/ui'
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
} from 'react'

import { filterInputValue } from '~/shared/utils/input'

export interface NumberInputProps extends ComponentPropsWithoutRef<'input'> {
  width?: string
  fullWidth?: boolean
  hasError?: boolean
  typoType?: TypoProps['type']
  placeholderTypoType?: TypoProps['type']
  color?: string
  allowMinus?: boolean
}

function NumberInput(
  { onChange, allowMinus, ...rest }: NumberInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { filteredValue, selectionStart, selectionEnd } = filterInputValue(
        e,
        (value) => extractDigits(value, allowMinus)
      )

      e.target.value = filteredValue
      e.target.selectionStart = selectionStart
      e.target.selectionEnd = selectionEnd

      onChange?.(e)
    },
    [allowMinus, onChange]
  )

  return (
    <Input {...rest} ref={ref} inputMode="numeric" onChange={handleChange} />
  )
}

export default forwardRef(NumberInput)
