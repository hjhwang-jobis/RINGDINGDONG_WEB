import { Button } from '@fe3o3/ui'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowSelect from '~/components/FormRowSelect'
import KeyValueTable from '~/components/KeyValueTable'
import { createOption } from '~/components/SelectBox'
import {
  AlimtalkChannelType,
  AlimtalkChannelTypeToChannelIdMap,
  DEFAULT_PAGE_SIZE,
  SortDirection,
} from '~/constants'
import { validators } from '~/utils'

export default function AlimtalkTemplateFormSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      channelId: searchParams.get('profile') ?? AlimtalkChannelType.SZS,
      templateCode: searchParams.get('templateCode') ?? '',
    },
  })

  return (
    <FormProvider {...methods}>
      <KeyValueTable.Root>
        <KeyValueTable.KeyColumn>발신 프로필 그룹</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowSelect
            name="channelId"
            options={[
              createOption(
                AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS],
                AlimtalkChannelType.SZS
              ),
              createOption(
                AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.MYBIZ],
                AlimtalkChannelType.MYBIZ
              ),
              createOption(
                AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.PARTNER],
                AlimtalkChannelType.PARTNER
              ),
              createOption(
                AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.CLAIM],
                AlimtalkChannelType.CLAIM
              ),
              createOption(
                AlimtalkChannelTypeToChannelIdMap[AlimtalkChannelType.SZS_HOW],
                AlimtalkChannelType.SZS_HOW
              ),
              createOption(
                AlimtalkChannelTypeToChannelIdMap[
                  AlimtalkChannelType.SZS_INTERVIEW
                ],
                AlimtalkChannelType.SZS_INTERVIEW
              ),
              createOption(
                AlimtalkChannelTypeToChannelIdMap[
                  AlimtalkChannelType.SZS_GOODJOB
                ],
                AlimtalkChannelType.SZS_GOODJOB
              ),
            ]}
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>템플릿 코드</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <FormRowBasicInputField
            name={'templateCode'}
            placeholder="템플릿 코드를 입력해주세요."
            validateInRules={(v) =>
              validators.run([
                validators.validateInRulesStrMinMaxAllowEmpty(v, 1, 40),
              ])
            }
          />
        </KeyValueTable.ValueColumn>
        <KeyValueTable.KeyColumn>검색</KeyValueTable.KeyColumn>
        <KeyValueTable.ValueColumn>
          <Button
            type="submit"
            size="small"
            onClick={methods.handleSubmit((data) => {
              setSearchParams({
                page: '1',
                size: `${DEFAULT_PAGE_SIZE}`,
                direction: SortDirection.DESC,
                profile: data.channelId,
                templateCode: data.templateCode,
              })
            })}
            disabled={!methods.formState.isValid}
          >
            검색
          </Button>
        </KeyValueTable.ValueColumn>
      </KeyValueTable.Root>
    </FormProvider>
  )
}
