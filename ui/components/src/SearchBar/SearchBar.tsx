import styled from '@emotion/styled'
import { Dropdown, DropdownOption, palette, SearchInput } from '@fe3o3/ui'
import React, { useCallback, useMemo, useState } from 'react'

import { Field } from '~/Field'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 0.5rem;
`

const DropdownWrapper = styled.div`
  width: 150px;
`

const SearchInputWrapper = styled.div`
  flex-grow: 1;
`

export type SearchField = DropdownOption & {
  inputType?: 'text' | 'number' | 'phone'
}

export interface SearchValue {
  field: DropdownOption
  keyword: string
}

export interface Props {
  fields: SearchField[]
  defaultField?: SearchField
  onSearch?: (searchValue: SearchValue) => void
  maxLength?: number
  blankRequried?: boolean
}

function SearchBar({
  fields,
  defaultField,
  onSearch,
  maxLength,
  blankRequried = false,
}: Props) {
  const [field, setField] = useState<SearchField | undefined>(defaultField)
  const [keyword, setKeyword] = useState('')

  const hasError = useMemo(() => {
    switch (field?.inputType) {
      case 'number':
        return /[^\d\s]/.test(keyword)
      case 'phone':
        return /[^\d\s-]/.test(keyword)
      default:
        return false
    }
  }, [field?.inputType, keyword])

  const errorDescription = useMemo(() => {
    if (!hasError) {
      return
    }

    let description = ''

    switch (field?.inputType) {
      case 'number':
        description = '숫자만 입력 가능합니다.'
        break
      case 'phone':
        description = '전화번호 형식이어야 합니다.'
        break
    }

    return field?.label ? `${field?.label} 항목은 ${description}` : description
  }, [hasError, field?.inputType, field?.label])

  const removeUnnecessary = useCallback(
    (keyword: string) => {
      let value = blankRequried ? keyword : keyword.replace(/\s/g, '')

      switch (field?.inputType) {
        case 'phone':
          value = value.replace(/-/g, '')
      }

      return value
    },
    [blankRequried, field?.inputType]
  )

  const handleSubmit = useCallback(
    (value: string) => {
      if (!field || hasError) {
        return
      }

      const keyword = removeUnnecessary(value)

      if (onSearch) {
        onSearch({ field, keyword })

        setKeyword('')
      }
    },
    [field, hasError, removeUnnecessary, onSearch]
  )

  return (
    <Container>
      <DropdownWrapper>
        <Dropdown
          option={field}
          options={fields}
          placeholder="검색 필드"
          onSelect={setField}
        />
      </DropdownWrapper>
      <SearchInputWrapper>
        <Field hasError={hasError} description={errorDescription}>
          <SearchInput
            value={keyword}
            maxLength={maxLength}
            inputSize="medium"
            placeholder={'검색어를 입력하세요'}
            onChange={(e) => setKeyword(e.target.value)}
            onSubmit={handleSubmit}
            onReset={() => setKeyword('')}
            style={{
              width: '100%',
              backgroundColor: palette.white,
              border: `1px solid ${palette.gray['20']}`,
              borderRadius: '0.25rem',
              boxSizing: 'border-box',
            }}
          />
        </Field>
      </SearchInputWrapper>
    </Container>
  )
}

export default SearchBar
