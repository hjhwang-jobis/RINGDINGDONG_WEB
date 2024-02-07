import styled from '@emotion/styled'
import { Dropdown, DropdownOption } from '@fe3o3/ui'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import NextNavControl from '~/Pagination/NextNavControl'
import PrevNavControl from '~/Pagination/PrevNavControl'

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`

const PageDropdownWrapper = styled.div`
  width: 9.375rem;
`

export interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function Pagination({ page, totalPages, onChange }: Props) {
  const [pageOption, setPageOption] = useState<DropdownOption>()

  const pageOptions = useMemo(() => {
    return [...Array(totalPages).keys()].map<DropdownOption>((page) => ({
      value: page,
      label: `${(page + 1).toString()} 페이지`,
    }))
  }, [totalPages])

  const isDisabledPrev = useMemo(() => page <= 0, [page])

  const isDisabledNext = useMemo(
    () => page >= totalPages - 1,
    [page, totalPages]
  )

  const handlePrevClick = useCallback(() => {
    if (isDisabledPrev) {
      return
    }

    onChange(page - 1)
  }, [isDisabledPrev, onChange, page])

  const handleNextClick = useCallback(() => {
    if (isDisabledNext) {
      return
    }

    onChange(page + 1)
  }, [isDisabledNext, onChange, page])

  const handlePageSelect = useCallback(
    (pageOption?: DropdownOption) => {
      if (!pageOption) {
        return
      }

      onChange(pageOption.value as number)
    },
    [onChange]
  )

  useEffect(() => {
    setPageOption({
      value: page,
      label: `${(page + 1).toString()} 페이지`,
    })
  }, [page])

  if (!totalPages) return null

  return (
    <Container>
      <PrevNavControl disabled={isDisabledPrev} onClick={handlePrevClick} />
      <PageDropdownWrapper>
        <Dropdown
          narrowed
          placeholder="페이지"
          option={pageOption}
          options={pageOptions}
          onSelect={handlePageSelect}
        />
      </PageDropdownWrapper>
      <NextNavControl disabled={isDisabledNext} onClick={handleNextClick} />
    </Container>
  )
}

export default Pagination
