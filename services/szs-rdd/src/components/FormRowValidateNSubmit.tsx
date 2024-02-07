import { Button } from '@fe3o3/ui'
import React from 'react'

import KeyValueTable from '~/components/KeyValueTable'

interface Props {
  onValidate: () => void
  onSubmit?: () => void
  isValid: boolean
}

export default function FormRowValidateNSubmit({
  onValidate,
  onSubmit,
  isValid,
}: Props) {
  return (
    <>
      <KeyValueTable.KeyColumn>검사</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <Button
          type="button"
          variant="lightBlue"
          size="small"
          onClick={onValidate}
        >
          검사
        </Button>
      </KeyValueTable.ValueColumn>
      <KeyValueTable.KeyColumn>저장</KeyValueTable.KeyColumn>
      <KeyValueTable.ValueColumn>
        <Button
          type={onSubmit ? 'button' : 'submit'}
          size="small"
          onClick={() => onSubmit?.()}
          disabled={!isValid}
        >
          저장
        </Button>
      </KeyValueTable.ValueColumn>
    </>
  )
}
