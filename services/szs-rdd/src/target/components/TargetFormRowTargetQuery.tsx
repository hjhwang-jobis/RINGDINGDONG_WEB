import { Flex, Spacing, Text } from '@3o3/mystique-components'
import { colors } from '@3o3/mystique-core'
import { css } from '@emotion/react'
import { Button } from '@fe3o3/ui'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

import FormRowToggle from '~/components/FormRowToggle'
import { RoutePath } from '~/routes'

interface Props {
  idx: number
  disabled: boolean
  onDelete: (idx: number) => void
}

export default function TargetFormRowTargetQuery({
  idx,
  disabled,
  onDelete,
}: Props) {
  const { watch } = useFormContext()

  const id = watch(`targetQueries.${idx}.id`)
  const title = watch(`targetQueries.${idx}.title`)

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
        <Flex justifyContent="start" alignItems="left" flexDirection="column">
          <Text typography="body16" weight="regular">
            {`타겟 그룹 지정 ${idx + 1}`}
          </Text>
          <Text typography="body16" weight="regular">
            <Link
              to={`${RoutePath.TargetQuery}/${RoutePath.TargetQueryDetail}/${id}`}
              target="_blank"
            >
              [{id}] {title}
            </Link>
          </Text>
        </Flex>
        <Flex
          justifyContent="end"
          alignItems="center"
          css={css`
            height: 45px;
          `}
        >
          <FormRowToggle
            name={`targetQueries.${idx}.isIncluded`}
            labelOn="포함"
            labelOff="미포함"
            disabled={disabled}
          />
          <Button
            css={css`
              margin-left: 10px;
            `}
            variant="danger"
            size="small"
            onClick={() => onDelete(idx)}
          >
            삭제
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
