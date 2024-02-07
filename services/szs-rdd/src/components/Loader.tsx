import { Flex, Loader as SignatureLoader } from '@3o3/mystique-components'
import { zIndex } from '@3o3/mystique-core'
import { css } from '@emotion/react'

export default function Loader() {
  return (
    <Flex.Center
      css={css`
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: ${zIndex.transparentLoader};
      `}
    >
      <SignatureLoader />
    </Flex.Center>
  )
}
