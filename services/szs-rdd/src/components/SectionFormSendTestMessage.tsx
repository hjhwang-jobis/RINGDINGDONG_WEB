import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorInfo } from '@3o3-internal/components'
import React from 'react'

import FormSendMessage from '~/components/FormSendMessage'
import Loader from '~/components/Loader'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from '~/constants'
import { useGetTestersListQuery } from '~/hooks/queries/tester/useGetTestersListQuery'
import { SendTestMessagePayload } from '~/types'
import { apiUtils } from '~/utils'

interface Props {
  replacableText: string
  onSubmit: (payload: SendTestMessagePayload) => void
  disabled?: boolean
  canContainAlimlist?: boolean
}

export default function SectionFormSendTestMessage({
  replacableText,
  onSubmit,
  disabled = false,
  canContainAlimlist = false,
}: Props) {
  const {
    data: response,
    isLoading,
    error,
  } = useGetTestersListQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNo: DEFAULT_PAGE_NO - 1,
  })

  return (
    <>
      <Spacing px={20} />
      <Text typography="heading40" weight="bold">
        테스트 발송
      </Text>

      {disabled && (
        <>
          <Text
            typography="body16"
            weight="regular"
            color={`${colors.light.scheme.$red50}`}
          >
            테스트 메시지 발송이 불가 / active 여부를 재확인하세요
          </Text>
          <Spacing px={10} />
        </>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorInfo
          title="테스터 목록 조회 오류"
          message={apiUtils.getApiErrorMessage(error)}
        />
      ) : response && response.data.contents.length === 0 ? (
        <>
          <Text
            typography="body16"
            weight="regular"
            color={`${colors.light.scheme.$red50}`}
          >
            등록된 테스터가 없습니다.
          </Text>
          <Spacing px={10} />
        </>
      ) : response && response.data?.contents ? (
        <FormSendMessage
          replacableText={replacableText}
          testers={response.data.contents}
          onSubmit={onSubmit}
          disabled={disabled}
          canContainAlimlist={canContainAlimlist}
        />
      ) : null}
    </>
  )
}
