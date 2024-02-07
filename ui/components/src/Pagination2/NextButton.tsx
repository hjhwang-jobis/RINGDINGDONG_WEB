import React from 'react'

import NavigationButton, {
  NavigationButtonProps,
} from '~/Pagination2/NavigationButton'

type Props = Omit<NavigationButtonProps, 'icon'>

function NextButton(props: Props) {
  return <NavigationButton icon="ic_basic_medium_chevron_right" {...props} />
}

export default NextButton
