import React from 'react'

export interface FilteredInputValue {
  originalValue: string
  filteredValue: string
  selectionStart: number | null
  selectionEnd: number | null
}

export function filterInputValue(
  event: React.ChangeEvent<HTMLInputElement>,
  filter: (value: string) => string
): FilteredInputValue {
  const { value, selectionStart, selectionEnd } = event.target
  const filtered = filter(value)
  const differenceLength = value.length - filtered.length

  const start = selectionStart
    ? Math.max(selectionStart - differenceLength, 0)
    : null

  const end = selectionEnd ? Math.max(selectionEnd - differenceLength, 0) : null

  return {
    originalValue: value,
    filteredValue: filtered,
    selectionStart: start,
    selectionEnd: end,
  }
}
