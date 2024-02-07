import {
  Card as BaseCard,
  CardContainer,
  CardProps,
  CardTitle,
  IconProps,
  Spacing,
} from '@fe3o3/ui'
import React from 'react'

interface Props extends CardProps {
  titleElement?: React.ReactNode
  titleColor?: string
  prefixIcon?: IconProps['icon']
  prefixIconColor?: string
  suffixIcon?: IconProps['icon']
  suffixIconColor?: string
  children: React.ReactNode
}

function Card({
  type = 'white',
  titleElement,
  titleColor,
  prefixIcon,
  prefixIconColor,
  suffixIcon,
  suffixIconColor,
  children,
  ...rest
}: Props) {
  return (
    <BaseCard
      type={type}
      style={{
        boxShadow: `rgb(18 22 25 / 10%) 0px 2px 10px`,
      }}
      {...rest}
    >
      <CardContainer>
        {titleElement && (
          <>
            <CardTitle
              type="S1"
              color={titleColor}
              prefixIconName={prefixIcon}
              prefixIconColor={prefixIconColor}
              suffixIconName={suffixIcon}
              suffixIconColor={suffixIconColor}
            >
              {titleElement}
            </CardTitle>
            <Spacing size={16} />
          </>
        )}
        {children}
      </CardContainer>
    </BaseCard>
  )
}

export default Card
