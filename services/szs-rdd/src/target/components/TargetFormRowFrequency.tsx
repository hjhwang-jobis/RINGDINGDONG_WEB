import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button } from '@fe3o3/ui'

import FormRowBasicInputField from '~/components/FormRowBasicInputField'
import FormRowSelect from '~/components/FormRowSelect'
import { createOption } from '~/components/SelectBox'
import {
  TargetFrequencyChannelType,
  TargetFrequencyChannelTypeMap,
} from '~/target/constants'
import { validators } from '~/utils'

interface Props {
  idx: number
  onDelete: (id: number) => void
}

export default function TargetFormRowFrequency({ idx, onDelete }: Props) {
  return (
    <>
      {idx > 0 && <Spacing px={10} />}
      <Flex
        justifyContent="space-between"
        css={css`
          padding: 10px;
          border: 1px solid ${colors.light.scheme.$gray20};
          border-radius: 5px;
          background: ${colors.light.scheme.$gray5};
        `}
      >
        <Flex justifyContent="start" alignItems="center">
          <Text typography="body16" weight="regular">
            수신채널
          </Text>
          &nbsp;
          <FormRowSelect
            name={`frequencies.${idx}.channel`}
            options={[
              createOption(
                TargetFrequencyChannelTypeMap[
                  TargetFrequencyChannelType.ALIMTALK
                ],
                TargetFrequencyChannelType.ALIMTALK
              ),
              createOption(
                TargetFrequencyChannelTypeMap[
                  TargetFrequencyChannelType.FRIENDTALK
                ],
                TargetFrequencyChannelType.FRIENDTALK
              ),
              createOption(
                TargetFrequencyChannelTypeMap[TargetFrequencyChannelType.PUSH],
                TargetFrequencyChannelType.PUSH
              ),
            ]}
          />
          &nbsp;
          <Text typography="body16" weight="regular">
            에서
          </Text>
          &nbsp;
          <StyledInputBox>
            <FormRowBasicInputField
              name={`frequencies.${idx}.withinDays`}
              type="number"
              validateInRules={(v) =>
                validators.run([
                  validators.validateInRulesNumberRange(v, 0, 29),
                ])
              }
            />
          </StyledInputBox>
          <Text typography="body16" weight="regular">
            일 이내
          </Text>
          <StyledInputBox>
            <FormRowBasicInputField
              name={`frequencies.${idx}.moreThanCount`}
              type="number"
              validateInRules={(v) =>
                validators.run([
                  validators.validateInRulesNumberRange(v, 0, 99),
                ])
              }
            />
          </StyledInputBox>
          <Text typography="body16" weight="regular">
            회 미만 수신 고객 대상
          </Text>
        </Flex>
        <Flex
          justifyContent="end"
          alignItems="center"
          css={css`
            height: 45px;
          `}
        >
          <Button variant="danger" size="small" onClick={() => onDelete(idx)}>
            삭제
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

const StyledInputBox = styled.div`
  width: 80px;
`
