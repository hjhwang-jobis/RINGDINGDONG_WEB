import { Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { ErrorInfo } from '@3o3-internal/components'
import React, { Fragment, useCallback } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  AlimlistTemplateButtonRequestLandingStyleType,
  AlimlistTemplateButtonRequestLandingStyleTypeOptions,
  AlimlistTemplateButtonRequestLandingType,
  AlimlistTemplateButtonRequestLandingTypeOptions,
  AlimlistTemplateNotificationType,
  AlimlistTemplateNotificationTypeOptions,
} from '~/alimlist/constants'
import { FormAlimlistTemplate } from '~/alimlist/types'
import FormRowAutoFillParameters from '~/components/FormRowAutoFillParameters'
import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowRadio from '~/components/FormRowRadio'
import FormRowTextTemplateCode from '~/components/FormRowTextTemplateCode'
import FormRowValidateNSubmit from '~/components/FormRowValidateNSubmit'
import ImagePreview from '~/components/ImagePreview'
import KeyValueTable from '~/components/KeyValueTable'
import usePostAlimlistTemplatesMutation from '~/hooks/queries/alimlist/usePostAlimlistTemplatesMutation'
import { RoutePath } from '~/routes'
import { ParameterField, ParameterMap } from '~/types'
import { apiUtils } from '~/utils'
import {
  autoFillParameterUtils,
  parameterUtils,
  requestParameterUtils,
  validators,
} from '~/utils'

import FormRowAlimlistImageSearch from './FormRowAlimlistImageSearch'

interface Props {
  data?: FormAlimlistTemplate
  readOnly?: boolean
}

const TITLE_MIN_LENGTH = 2
const TITLE_MAX_LENGTH = 35

const SUBTITLE_MIN_LENGTH = 5
const SUBTITLE_MAX_LENGTH = 48

const BUTTON_MIN_LENGTH = 2
const BUTTON_MAX_LENGTH = 15

export default function AlimlistForm({
  data = {
    templateCode: '',
    title: '',
    subTitle: '',
    imageUrl: '',
    buttonRequests: [
      {
        landingUrl: '',
        landingStyle: AlimlistTemplateButtonRequestLandingStyleType.BROWSER,
        landingType: AlimlistTemplateButtonRequestLandingType.WEB,
        description: '',
        contentIds: '',
      },
    ],
    notificationType: AlimlistTemplateNotificationType.TEXT_BUTTON,
    requestParameter: [],
    autoFillParameter: {},
  },
  readOnly = false,
}: Props) {
  const navigate = useNavigate()
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...data,
      autoFillParameterFieldList:
        autoFillParameterUtils.createAutoFillParameterFieldListFromText(
          `${data.title}${data.subTitle}`,
          data.autoFillParameter
        ),
      requestParameter: requestParameterUtils.createRequestParameterFromText(
        `${data.title}${data.subTitle}`
      ),
    },
  })
  const buttonRequestFieldArray = useFieldArray({
    control: methods.control,
    name: 'buttonRequests',
  })

  const { mutate, error } = usePostAlimlistTemplatesMutation({
    onSuccess: () =>
      navigate(
        `${RoutePath.AlimlistTemplate}/${RoutePath.AlimlistTemplateList}`
      ),
  })

  const onSubmit = (
    data: FormAlimlistTemplate & {
      autoFillParameterFieldList: ParameterField[]
    }
  ) => {
    mutate({
      templateCode: data.templateCode,
      title: data.title,
      subTitle: data.subTitle,
      imageUrl: data.imageUrl,
      buttonRequests: data.buttonRequests,
      notificationType: data.notificationType,
      requestParameter: data.requestParameter,
      autoFillParameter: autoFillParameterUtils.convertToAutoFillParameter(
        data.autoFillParameterFieldList
      ),
    })
  }

  const notificationType = methods.watch('notificationType')
  const isNotificationTypeTextImageButton =
    notificationType === AlimlistTemplateNotificationType.TEXT_IMAGE_BUTTON

  // NOTE: 자동치환자 단어 처리
  const updateReplaceableTextVariables = useCallback(() => {
    parameterUtils.updateAutoFillNRequestParameters({
      getTexts: () =>
        [methods.getValues('title'), methods.getValues('subTitle')].join(''),
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

  return (
    <>
      {error && (
        <>
          <ErrorInfo
            title="알림리스트 생성 오류"
            message={apiUtils.getApiErrorMessage(error)}
          />
          <Spacing px={10} />
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <KeyValueTable.Root>
            <KeyValueTable.KeyColumn>메시지 타입</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowRadio
                name={'notificationType'}
                options={AlimlistTemplateNotificationTypeOptions}
                readOnly={readOnly}
              />
            </KeyValueTable.ValueColumn>
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
            <KeyValueTable.KeyColumn>서브타이틀*</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <FormRowBasicInputField
                name={'subTitle'}
                placeholder={`공백포함 ${SUBTITLE_MAX_LENGTH}자까지 가능, 이모지 사용가능`}
                validateInRules={(v) =>
                  validators.run([
                    validators.validateInRulesStrMinMax(
                      v,
                      SUBTITLE_MIN_LENGTH,
                      SUBTITLE_MAX_LENGTH
                    ),
                  ])
                }
                onBlur={updateReplaceableTextVariables}
                disabled={readOnly}
              />
            </KeyValueTable.ValueColumn>
            <KeyValueTable.KeyColumn>버튼</KeyValueTable.KeyColumn>
            <KeyValueTable.ValueColumn>
              <KeyValueTable.Root>
                {buttonRequestFieldArray.fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <KeyValueTable.KeyColumn>버튼명*</KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowBasicInputField
                        name={`buttonRequests.${index}.description`}
                        placeholder={`공백포함 ${BUTTON_MAX_LENGTH}자까지 가능, 이모지 사용가능`}
                        validateInRules={(v) =>
                          validators.run([
                            validators.validateInRulesStrMinMax(
                              v,
                              BUTTON_MIN_LENGTH,
                              BUTTON_MAX_LENGTH
                            ),
                          ])
                        }
                        disabled={readOnly}
                      />
                    </KeyValueTable.ValueColumn>
                    <KeyValueTable.KeyColumn>
                      웹/네이티브
                    </KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowRadio
                        name={`buttonRequests.${index}.landingType`}
                        options={
                          AlimlistTemplateButtonRequestLandingTypeOptions
                        }
                        readOnly={readOnly}
                      />
                    </KeyValueTable.ValueColumn>
                    <KeyValueTable.KeyColumn>랜딩방식</KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowRadio
                        name={`buttonRequests.${index}.landingStyle`}
                        options={
                          AlimlistTemplateButtonRequestLandingStyleTypeOptions
                        }
                        readOnly={readOnly}
                      />
                      <Spacing px={10} />
                      <Text typography="body12" weight="regular">
                        <ul>
                          <li>&bull;푸시: 랜딩 이후 이전 화면으로 이동</li>
                          <li>
                            &bull;딥링크: 랜딩 이후 해당 화면기준 이전 화면으로
                            이동(ex. 설정 화면으로 이동시 마이페이지로 이동)
                          </li>
                          <li>&bull;브라우저: 인앱 브라우저를 노출</li>
                        </ul>
                      </Text>
                    </KeyValueTable.ValueColumn>
                    <KeyValueTable.KeyColumn>랜딩 URL*</KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowBasicInputField
                        name={`buttonRequests.${index}.landingUrl`}
                        placeholder={'랜딩 URL을 입력해주세요'}
                        validateInRules={(v) =>
                          validators.run([
                            validators.validateInRulesRequired(v),
                          ])
                        }
                        disabled={readOnly}
                      />
                    </KeyValueTable.ValueColumn>
                    <KeyValueTable.KeyColumn>
                      컨텐츠 아이디
                    </KeyValueTable.KeyColumn>
                    <KeyValueTable.ValueColumn>
                      <FormRowBasicInputField
                        name={`buttonRequests.${index}.contentIds`}
                        placeholder={
                          '랜딩 URL에 결합할 컨텐츠 아이디가 있을 경우에만 입력하세요. 여러개일 경우 ,로 구분해 주세요 (예시: 10,15,20)'
                        }
                        disabled={readOnly}
                      />
                    </KeyValueTable.ValueColumn>
                  </Fragment>
                ))}
              </KeyValueTable.Root>
            </KeyValueTable.ValueColumn>
            {isNotificationTypeTextImageButton && (
              <>
                <KeyValueTable.KeyColumn>
                  이미지 알림(선택)
                </KeyValueTable.KeyColumn>
                <KeyValueTable.ValueColumn>
                  {data.imageUrl ? (
                    <ImagePreview src={data.imageUrl} />
                  ) : readOnly ? (
                    <Text
                      typography="body12"
                      weight="regular"
                      color={colors.light.scheme.$red50}
                    >
                      이미지가 없습니다.
                    </Text>
                  ) : (
                    <FormRowAlimlistImageSearch
                      name={'imageUrl'}
                      disabled={readOnly}
                      imageUrl={data.imageUrl}
                    />
                  )}
                </KeyValueTable.ValueColumn>
              </>
            )}
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
                onSubmit={methods.handleSubmit((data) =>
                  mutate({
                    templateCode: data.templateCode,
                    title: data.title,
                    subTitle: data.subTitle,
                    imageUrl: data.imageUrl,
                    buttonRequests: data.buttonRequests,
                    notificationType: data.notificationType,
                    requestParameter: data.requestParameter,
                    autoFillParameter:
                      autoFillParameterUtils.convertToAutoFillParameter(
                        data.autoFillParameterFieldList
                      ),
                  })
                )}
                isValid={methods.formState.isValid}
              />
            )}
          </KeyValueTable.Root>
        </form>
      </FormProvider>
    </>
  )
}
