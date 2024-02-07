import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import { useCallback } from 'react'

import Chip, { ChipOption, ChipProps } from '~/Chip/Chip'

export interface FilterChipProps<T> extends ChipProps {
  option: ChipOption<T>
  selected: boolean
  disabled: boolean
  onFilter?: (option: ChipOption<T>, selected: boolean) => void
}

function FilterChip<T>(props: FilterChipProps<T>) {
  const { option, selected, disabled, onFilter } = props

  const handleClick = useCallback(() => {
    if (disabled) return
    if (!onFilter) return
    onFilter(option, selected)
  }, [option, selected, disabled, onFilter])

  return (
    <Container onClick={handleClick} disabled={disabled}>
      <StyledChip
        selected={selected}
        disabled={disabled}
        bgColor={selected ? palette.solid.blue : palette.white}
        fontColor={selected ? palette.white : palette.gray[40]}
        borderColor={selected ? palette.solid.blue : palette.gray[20]}
      >
        {option.label}
      </StyledChip>
    </Container>
  )
}

const Container = styled.div<Pick<FilterChipProps<unknown>, 'disabled'>>`
  display: flex;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`

const StyledChip = styled(Chip)<
  Pick<FilterChipProps<unknown>, 'selected' | 'disabled'>
>`
  ${({ selected, disabled }) =>
    !selected &&
    !disabled &&
    css`
      &:hover {
        color: ${palette.white};
        background-color: ${palette.gray[20]};
      }
    `}
`

export default FilterChip
