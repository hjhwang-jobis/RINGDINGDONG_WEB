import { Dropdown, DropdownOption } from '@fe3o3/ui'
import React, { useCallback, useMemo } from 'react'

export interface Props {
  narrowed?: boolean
  size: number
  sizes: number[] | Readonly<number[]>
  onChange: (size: number) => void
}

function PageSizeDropdown({ narrowed = true, size, sizes, onChange }: Props) {
  const sizeOptions = useMemo(
    () =>
      sizes.map((size) => {
        const option: DropdownOption = {
          label: `${size}개씩 보기`,
          value: size,
        }

        return option
      }),
    [sizes]
  )

  const sizeOption = useMemo(
    () => sizeOptions.find((option) => option.value === size),
    [sizeOptions, size]
  )

  const handleSizeChange = useCallback(
    (option?: DropdownOption) => {
      if (!option) {
        return
      }

      onChange(option.value as number)
    },
    [onChange]
  )

  return (
    <Dropdown
      narrowed={narrowed}
      option={sizeOption}
      options={sizeOptions}
      onSelect={handleSizeChange}
    />
  )
}

export default PageSizeDropdown
