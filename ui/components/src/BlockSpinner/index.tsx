import { Flex } from '@3o3/ui'
import { Spinner, SpinnerProps } from '@fe3o3/ui'
import React from 'react'

type Props = Omit<SpinnerProps, 'variant' | 'size'> &
  Partial<Pick<SpinnerProps, 'variant' | 'size'>>

function BlockSpinner({ variant = 'primary', size = 'large', ...rest }: Props) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Spinner variant={variant} size={size} {...rest} />
    </Flex>
  )
}

export default BlockSpinner
