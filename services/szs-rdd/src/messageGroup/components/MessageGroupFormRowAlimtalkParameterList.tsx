import { ErrorInfo } from '@3o3-internal/components'
import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { ParameterType } from '~/alimtalk/constants'
import Loader from '~/components/Loader'
import { AlimtalkChannelType, MessageChannelType } from '~/constants'
import { useGetAlimtalkTemplatesMatchedParametersQueries } from '~/hooks/queries/alimtalk/useGetAlimtalkTemplatesMatchedParametersQueries'
import {
  FormMessageGroupTemplate,
  SelectedMessageGroupTemplate,
} from '~/messageGroup/types'
import { ParameterField } from '~/types'
import { apiUtils, parameterUtils } from '~/utils'

import MessageGroupFormRowParameterList from './MessageGroupFormRowParameterList'

interface Props {
  messageGroupTemplates: SelectedMessageGroupTemplate[]
  alimtalkChannelType: AlimtalkChannelType
  messageChannelType: MessageChannelType
}

export default function MessageGroupFormRowAlimtalkParameterList({
  messageGroupTemplates,
  alimtalkChannelType,
  messageChannelType,
}: Props) {
  const queries = useGetAlimtalkTemplatesMatchedParametersQueries(
    messageGroupTemplates.map((v) => ({
      templateCode: v.templateCode,
      profile: alimtalkChannelType,
    }))
  )

  const isLoading = useMemo(
    () => queries.some((value) => value.isLoading),
    [queries]
  )

  const responses = useMemo(() => queries.map((value) => value.data), [queries])

  const errors = useMemo(
    () => queries.filter((value) => value.isError).map((value) => value.error),
    [queries]
  )

  const { setValue, getValues } = useFormContext()
  useEffect(() => {
    if (isLoading || errors.length > 0 || !responses) return

    const formMessageGroupTemplates: FormMessageGroupTemplate[] = responses.map(
      (v, idx) => {
        const templateCode = messageGroupTemplates[idx].templateCode
        if (!v) {
          return {
            templateCode,
            parameterRows: [],
            isContainAlimlist: false,
          }
        }

        const parameterRows: ParameterField[] =
          parameterUtils.getUniqueParameterFieldsFromMatchedInfos(
            ParameterType.BASIC,
            v.data.matchedInfos
          )

        return {
          templateCode,
          parameterRows,
          isContainAlimlist: false,
        }
      }
    )

    const keyFromResponse = formMessageGroupTemplates.reduce(
      (acc, v) => `${acc}${v}`,
      ''
    )
    const formMessageGroupTemplatesFromForm: FormMessageGroupTemplate[] =
      getValues('formMessageGroupTemplates')
    const keyFromForm = formMessageGroupTemplatesFromForm.reduce(
      (acc, v) => `${acc}${v}`,
      ''
    )

    if (keyFromResponse !== keyFromForm) {
      setValue('formMessageGroupTemplates', formMessageGroupTemplates)
    }
  }, [isLoading, responses, errors, messageGroupTemplates, setValue, getValues])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errors && errors.length > 0 ? (
        <ErrorInfo
          title="알림톡 매칭 파라미터 조회 오류"
          message={apiUtils.getApiErrorMessage(errors[0])}
        />
      ) : responses ? (
        <MessageGroupFormRowParameterList
          messageChannelType={messageChannelType}
        />
      ) : null}
    </>
  )
}
