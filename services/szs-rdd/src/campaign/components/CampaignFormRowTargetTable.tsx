import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'

import KeyValueTable from '~/components/KeyValueTable'
import Loader from '~/components/Loader'
import { useGetTargetsQuery } from '~/hooks/queries/target/useGetTargetsQuery'
import { apiUtils } from '~/utils'

interface Props {
  targetId: number
}

export default function CampaignFormRowTargetTable({ targetId }: Props) {
  const {
    data: response,
    isLoading,
    error,
  } = useGetTargetsQuery({
    targetId,
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="타겟 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data ? (
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>타겟 이름</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {response.data.title}
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>예상발송 모수</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            {response.data.estimatedTargetCount ?? '-'}
          </KeyValueTable.ValueColumn>
        </KeyValueTable.Root>
      ) : null}
    </>
  )
}
