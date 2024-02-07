import styled from '@emotion/styled'
import { palette } from '@fe3o3/ui'
import React, { isValidElement, ReactNode } from 'react'

const Container = styled.div``

const Label = styled.label`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 0.5rem;
  color: ${palette.gray[70]};
`

const Description = styled.div<{ hasError?: boolean }>`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${({ hasError }) => (hasError ? palette.solid.red : palette.black)}}
`

export interface Props {
  label?: string
  children: ReactNode
  description?: string
  hasError?: boolean
}

function Field({ label, children, description, hasError }: Props) {
  return (
    <Container>
      {label && (
        <Label>{isValidElement(label) ? label : <div>{label}</div>}</Label>
      )}
      {children}
      {description && (
        <Description hasError={hasError}>{description}</Description>
      )}
    </Container>
  )
}

export default Field
