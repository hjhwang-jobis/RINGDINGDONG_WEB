import { Spacing } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { queryClient } from '~/api/reactQuery'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowTextArea from '~/components/FormRowTextArea'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostParametersBasicsMutation } from '~/hooks/queries/basicParameter/usePostParametersBasicsMutation'
import { usePutParametersBasicsMutation } from '~/hooks/queries/basicParameter/usePutParametersBasicsMutation'
import { queryKeys } from '~/keys/queries'
import { RoutePath } from '~/routes'
import { Parameter } from '~/types'
import { apiUtils } from '~/utils'
import { authorUtils, validators } from '~/utils'

interface Props {
  data?: Parameter
}

export default function BasicParameterForm({
  data = {
    id: 0,
    createdAt: '',
    updatedAt: '',
    parameter: '',
    title: '',
    description: '',
    default: '',
    author: authorUtils.getAuthorEmpty(),
  },
}: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...data,
    },
  })

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.basicParameter.BASE)
    navigate(`${RoutePath.BasicParameter}/${RoutePath.BasicParameterList}`)
  }, [navigate])

  const { mutate: mutatePostParameterBasics, error: errorPostParameterBasics } =
    usePostParametersBasicsMutation({
      onSuccess,
    })

  const { mutate: mutatePutParameterBasics, error: errorPutParameterBasics } =
    usePutParametersBasicsMutation({
      onSuccess,
    })

  const isEditMode = data.id > 0

  const onSubmit = (data: Parameter) => {
    if (isEditMode) {
      mutatePutParameterBasics({
        parameterId: data.id,
        title: data.title,
        description: data.description ?? '',
      })

      return
    }
    mutatePostParameterBasics({
      title: data.title,
      description: data.description ?? '',
      parameter: data.parameter,
    })
  }

  return (
    <>
      {errorPostParameterBasics && (
        <>
          <ErrorInfo
            title="기본 파라미터 생성 오류"
            message={apiUtils.getApiErrorMessage(errorPostParameterBasics)}
          />
          <Spacing px={10} />
        </>
      )}
      {errorPutParameterBasics && (
        <>
          <ErrorInfo
            title="기본 파라미터 수정 오류"
            message={apiUtils.getApiErrorMessage(errorPutParameterBasics)}
          />
          <Spacing px={10} />
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <KeyValueTable.Root>
            {data.id > 0 && (
              <>
                <KeyValueTable.KeyColumn>id</KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>{data.id}</KeyValueTable.ValueColumn>
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
            <KeyValueTable.KeyColumn>
              기본 파라미터 이름
            </KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'title'}
                placeholder="기본 파라미터 이름을 입력해주세요."
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(v, 5, 40),
                  ])
                }
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>기본 파라미터 값</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'parameter'}
                placeholder="기본 파라미터 값을 입력해주세요."
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesFormatBasicParameter(v),
                  ])
                }
                disabled={isEditMode}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>설명</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowTextArea name={'description'} />
            </KeyValueTable.ValueColumn>
            <FormRowValidateNSubmit
              onValidate={() => methods.trigger()}
              isValid={methods.formState.isValid}
            />
          </KeyValueTable.Root>
        </form>
      </FormProvider>
    </>
  )
}
