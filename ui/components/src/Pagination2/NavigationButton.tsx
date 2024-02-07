import styled from '@emotion/styled'
import { Icon, IconProps, palette } from '@fe3o3/ui'
import React from 'react'

export interface NavigationButtonProps {
  icon: IconProps['icon']
  disabled: boolean
  onClick: () => void
}

function NavigationButton({ icon, disabled, onClick }: NavigationButtonProps) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      <Icon icon={icon} color="inherit" />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  height: 2rem;
  box-sizing: border-box;
  color: ${palette.solid.blue};
  border: 1px solid ${palette.solid.blue};
  background-color: inherit;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${palette.white};
    background-color: ${palette.solid.blue};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${palette.gray[40]};
    border: 1px solid ${palette.gray[20]};
  }
`

export default NavigationButton
