import styled from '@emotion/styled'
import { Spacing } from '@fe3o3/ui'
import React, { useCallback, useMemo } from 'react'
import { HeaderGroup, IdType } from 'react-table'

import SortIcon from '~/Table/SortIcon'
import Th from '~/Table/Th'
import { SortDirection } from '~/Table/types'

export interface Props<T extends object> {
  style?: React.CSSProperties
  header: HeaderGroup<T>
  isSorted: boolean
  isSortedDesc?: boolean
  onSortingChange?: (
    columnId: IdType<T>,
    isSorted: boolean,
    sortDirection?: SortDirection
  ) => void
}

function SortableHeader<T extends object>({
  style,
  header,
  isSorted,
  isSortedDesc,
  onSortingChange,
}: Props<T>) {
  const headerSortByToggleProps = useMemo(
    () =>
      header.getSortByToggleProps({
        title: undefined,
      }),
    [header]
  )

  const handleClick = useCallback(() => {
    if (!header.toggleSortBy) {
      return
    }

    header.toggleSortBy()

    if (onSortingChange) {
      const isSorted = !header.isSortedDesc
      const sortDirection = header.isSorted
        ? header.isSortedDesc
          ? undefined
          : SortDirection.DESC
        : SortDirection.ASC

      onSortingChange(header.id, isSorted, sortDirection)
    }
  }, [header, onSortingChange])

  return (
    <StyledTh
      {...header.getHeaderProps(headerSortByToggleProps)}
      style={style}
      onClick={handleClick}
    >
      <Container>
        {header.render('Header')}
        <Spacing rem={0.125} inline />
        <SortIcon
          direction={isSorted ? (isSortedDesc ? 'desc' : 'asc') : 'none'}
        />
      </Container>
    </StyledTh>
  )
}

const StyledTh = styled(Th)`
  cursor: pointer;
`

const Container = styled.div`
  display: inline-flex;
  align-items: center;
`

export default SortableHeader
