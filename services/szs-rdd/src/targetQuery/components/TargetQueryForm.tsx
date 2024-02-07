import { ErrorModal, useModal } from '@3o3-internal/components'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowTextArea from '~/components/FormRowTextArea'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostTargetsQueriesMutation } from '~/hooks/queries/targetQuery/usePostTargetsQueriesMutation'
import { usePutTargetsQueriesMutation } from '~/hooks/queries/targetQuery/usePutTargetsQueriesMutation'
import { RoutePath } from '~/routes'
import { GetTargetsQueries, PostTargetsQueries } from '~/types/api'
import { validators } from '~/utils'

const sanitizeData = (
  data: GetTargetsQueries.TargetQuery
): PostTargetsQueries.Request => {
  return {
    title: data.title,
    jiraTicketLink: data.jiraTicketLink ?? '',
    description: data.description ?? '',
    query: data.query,
  }
}

interface Props {
  data?: GetTargetsQueries.TargetQuery
  readOnly?: boolean
}

const getAuthorEmpty = () => ({
  name: '',
  email: '',
})

export default function TargetQueryForm({
  data = {
    id: 0,
    queryId: '',
    title: '',
    jiraTicketLink: '',
    description: '',
    query: '',
    author: getAuthorEmpty(),
    createdAt: '',
    updatedAt: '',
    lastCalculatedAt: null,
    calculatedCount: null,
    status: null,
  },
  readOnly = false,
}: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...data,
    },
  })

  const onSuccess = useCallback(() => {
    navigate(`${RoutePath.TargetQuery}/${RoutePath.TargetQueryList}`)
  }, [navigate])
  const { showModal } = useModal()
  const { mutate: mutatePostTargetsQueries } = usePostTargetsQueriesMutation({
    onSuccess,
    onError: (error) => {
      showModal(ErrorModal, {
        title: '타겟 쿼리 생성 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  const { mutate: mutatePutTargetsQueries } = usePutTargetsQueriesMutation({
    onSuccess,
    onError: (error) => {
      showModal(ErrorModal, {
        title: '타겟 쿼리 수정 오류',
        errorMessage: error.message,
        errorCode: error.code ?? -1,
      })
    },
  })

  return (
    <>
      <FormProvider {...methods}>
        <KeyValueTable.Root>
          <KeyValueTable.KeyColumn>쿼리 정보</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <KeyValueTable.Root>
              {data.id > 0 && (
                <>
                  <KeyValueTable.KeyColumn>쿼리 Id</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {data.id}
                  </KeyValueTable.ValueColumn>
                </>
              )}
              {data.author.name && (
                <>
                  <KeyValueTable.KeyColumn>작성자</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {data.author.name}
                  </KeyValueTable.ValueColumn>
                </>
              )}
              {data.createdAt && (
                <>
                  <KeyValueTable.KeyColumn>생성일시</KeyValueTable.KeyColumn>
                  <KeyValueTable.ValueColumn>
                    {data.createdAt}
                  </KeyValueTable.ValueColumn>
                </>
              )}
              <KeyValueTable.KeyColumn>쿼리 제목</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <FormRowBasicInputField
                  name={'title'}
                  placeholder="쿼리 제목을 입력해주세요."
                  validateInRules={(v) =>
                    validators.run([
                      validators.validateInRulesStrMinMax(v, 5, 40),
                    ])
                  }
                  disabled={readOnly}
                />
              </KeyValueTable.ValueColumn>
              <KeyValueTable.KeyColumn>Jira 티켓</KeyValueTable.KeyColumn>
              <KeyValueTable.ValueColumn>
                <FormRowBasicInputField
                  name={'jiraTicketLink'}
                  placeholder="Jira 티켓 url을 입력해주세요."
                  validateInRules={(v) =>
                    validators.run([validators.validateInRulesFormatUrl(v)])
                  }
                  disabled={readOnly}
                />
              </KeyValueTable.ValueColumn>
            </KeyValueTable.Root>
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>설명</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowTextArea
              name={'description'}
              max={2000}
              disabled={readOnly}
            />
          </KeyValueTable.ValueColumn>
          <KeyValueTable.KeyColumn>쿼리문</KeyValueTable.KeyColumn>
          <KeyValueTable.ValueColumn>
            <FormRowTextArea name={'query'} max={100000} disabled={readOnly} />
          </KeyValueTable.ValueColumn>
          {!readOnly && (
            <FormRowValidateNSubmit
              onValidate={() => methods.trigger()}
              onSubmit={methods.handleSubmit((data) => {
                const dataSafe = sanitizeData(data)
                if (!!data.id) {
                  mutatePutTargetsQueries({
                    targetQueryId: `${data.id}`,
                    ...dataSafe,
                  })
                } else {
                  mutatePostTargetsQueries(dataSafe)
                }
              })}
              isValid={methods.formState.isValid}
            />
          )}
        </KeyValueTable.Root>
      </FormProvider>
    </>
  )
}
