import { filter, isEmpty, isNil, omit, uniq } from 'lodash-es'
import React, { useCallback, useEffect, useState } from 'react'

import { ChipOption } from '~/Chip/Chip'
import Chips, { ChipsProps } from '~/Chip/Chips'
import FilterChip from '~/Chip/FilterChip'

export interface FilterChipsProps<T> extends ChipsProps<T> {
  singular?: boolean
  clearable?: boolean
  disabledValues?: T[]
  filteredValues?: T[]
  onFilter?: (chips: T[]) => void
}

const FilterChips = <T,>(props: FilterChipsProps<T>) => {
  const { singular, onFilter } = props
  const clearable = isNil(props.clearable) ? true : props.clearable
  const [filteredValues, setFilteredValues] = useState<T[]>([])
  const [disabledValues, setDisabledValues] = useState<T[]>([])

  const handleFilter = useCallback(
    ({ value }: ChipOption<T>, selected: boolean) => {
      const chipValues: T[] = []
      if (singular) {
        if (!selected) chipValues.push(value)
      } else {
        if (!selected) chipValues.push(...uniq([...filteredValues, value]))
        else chipValues.push(...filter(filteredValues, (t) => t !== value))
      }

      if (!clearable && isEmpty(chipValues)) return

      setFilteredValues(chipValues)
      if (onFilter) onFilter(chipValues)
    },
    [singular, clearable, onFilter, filteredValues]
  )

  useEffect(() => {
    setFilteredValues(props.filteredValues || [])
    setDisabledValues(props.disabledValues || [])
  }, [props.disabledValues, props.filteredValues])

  return (
    <Chips {...omit(props, 'children')}>
      {(option, index) => (
        <FilterChip
          key={index}
          option={option}
          selected={filteredValues.includes(option.value)}
          disabled={disabledValues.includes(option.value)}
          onFilter={handleFilter}
        />
      )}
    </Chips>
  )
}

export default FilterChips
