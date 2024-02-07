import React from 'react'

import NavigationButton, {
  NavigationButtonProps,
} from '~/Pagination2/NavigationButton'

type Props = Omit<NavigationButtonProps, 'icon'>

function PreviousButton(props: Props) {
  return <NavigationButton icon="ic_basic_medium_chevron_left" {...props} />
}

export default PreviousButton
