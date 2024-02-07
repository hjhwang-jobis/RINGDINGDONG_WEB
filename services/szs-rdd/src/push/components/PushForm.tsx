import { Spacing } from '@3o3/mystique-components'
import { ErrorInfo } from '@3o3-internal/components'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormRowAutoFillParameters from '~/components/FormRowAutoFillParameters'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowTextTemplateCode from '~/components/FormRowTextTemplateCode'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import ImagePreview from '~/components/ImagePreview'
import KeyValueTable from '~/components/KeyValueTable'
import { usePostPushTemplatesMutation } from '~/hooks/queries/push/usePostPushTemplatesMutation'
import { FormPushTemplate } from '~/push/types'
import { RoutePath } from '~/routes'
import { ParameterField, ParameterMap } from '~/types'
import { PostPushTemplates } from '~/types/api'
import { apiUtils } from '~/utils'
import {
  autoFillParameterUtils,
  parameterUtils,
  requestParameterUtils,
  validators,
} from '~/utils'

import FormRowPushImageSearch from './FormRowPushImageSearch'

interface Props {
  data?: FormPushTemplate
  readOnly?: boolean
}

const TITLE_MIN_LENGTH = 2
const TITLE_MAX_LENGTH = 35

const BODY_MIN_LENGTH = 5
const BODY_MAX_LENGTH = 48

const sanitizeData = (
  data: FormPushTemplate & {
    autoFillParameterFieldList: ParameterField[]
  }
): PostPushTemplates.Request => ({
  templateCode: data.templateCode,
  title: data.title,
  body: data.body,
  imageUrl: data.imageUrl,
  link: data.link,
  requestParameter: data.requestParameter,
  autoFillParameter: autoFillParameterUtils.convertToAutoFillParameter(
    data.autoFillParameterFieldList
  ),
})

const concatTexts = (texts: string[]) => texts.join('')

export default function PushForm({
  data = {
    templateCode: '',
    title: '',
    body: '',
    imageUrl: '',
    link: '',
    autoFillParameter: {},
    requestParameter: [],
  },
  readOnly = false,
}: Props) {
  const navigate = useNavigate()
  const texts = concatTexts([data.title, data.body])
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...data,
      autoFillParameterFieldList:
        autoFillParameterUtils.createAutoFillParameterFieldListFromText(
          texts,
          data.autoFillParameter
        ),
      requestParameter:
        requestParameterUtils.createRequestParameterFromText(texts),
    },
  })

  const { mutate, error } = usePostPushTemplatesMutation({
    onSuccess: () =>
      navigate(`${RoutePath.PushTemplate}/${RoutePath.PushTemplateList}`),
  })

  // NOTE: 자동치환자 단어 처리
  const updateReplaceableTextVariables = useCallback(() => {
    parameterUtils.updateAutoFillNRequestParameters({
      getTexts: () =>
        concatTexts([methods.getValues('title'), methods.getValues('body')]),
      getAutoFillParameterFieldList: () =>
        methods.getValues('autoFillParameterFieldList'),
      setValueAutoFillParameter: (autoFillParameter: ParameterMap) =>
        methods.setValue('autoFillParameter', autoFillParameter),
      setValueRequestParameter: (requestParameter: string[]) =>
        methods.setValue('requestParameter', requestParameter),
      replaceAutoFillParameterFieldArray: (
        autoFillParameterFieldList: ParameterField[]
      ) =>
        methods.setValue(
          'autoFillParameterFieldList',
          autoFillParameterFieldList
        ),
    })
  }, [methods])

  const onSubmit = (
    data: FormPushTemplate & {
      autoFillParameterFieldList: ParameterField[]
    }
  ) => mutate(sanitizeData(data))

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="앱푸쉬 생성 오류"
            message={apiUtils.getApiErrorMessage(error)}
          />
          <Spacing px={10} />
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <KeyValueTable.Root>
            <KeyValueTable.KeyColumn>템플릿 코드*</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowTextTemplateCode
                name={'templateCode'}
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>타이틀*</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'title'}
                placeholder={`공백포함 20자 내 작성권장(공백포함 ${TITLE_MAX_LENGTH}자까지 가능), 이모지 사용가능`}
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(
                      v,
                      TITLE_MIN_LENGTH,
                      TITLE_MAX_LENGTH
                    ),
                  ])
                }
                onBlur={updateReplaceableTextVariables}
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>바디*</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'body'}
                placeholder={`공백포함 ${BODY_MAX_LENGTH}자까지 가능, 이모지 사용가능`}
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(
                      v,
                      BODY_MIN_LENGTH,
                      BODY_MAX_LENGTH
                    ),
                  ])
                }
                onBlur={updateReplaceableTextVariables}
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>이동링크*</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'link'}
                placeholder="이동링크 url을 입력해주세요"
                validateInRules={(v) =>
                  validators.run([validators.validateInRulesFormatUrl(v)])
                }
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>이미지 푸시(선택)</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              {readOnly && data.imageUrl ? (
                <ImagePreview src={data.imageUrl} />
              ) : (
                <FormRowPushImageSearch
                  name={'imageUrl'}
                  disabled={readOnly}
                  imageUrl={data.imageUrl}
                />
              )}
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>
              자동 치환 파라미터
            </KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowAutoFillParameters
                name={'autoFillParameterFieldList'}
                disabled={readOnly}
                onBlur={updateReplaceableTextVariables}
              />
            </KeyValueTable.ValueColumn>

            {!readOnly && (
              <FormRowValidateNSubmit
                onValidate={() => methods.trigger()}
                isValid={methods.formState.isValid}
              />
            )}
          </KeyValueTable.Root>
        </form>
      </FormProvider>
    </>
  )
}
