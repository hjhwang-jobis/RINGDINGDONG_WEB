import { colors } from '@3o3/mystique-core'
import styled from '@emotion/styled'

function Content({ children }: { children: JSX.Element }) {
  return <Container>{children}</Container>
}

export default Content

const Container = styled.div`
  flex: 1;
  height: 100%;
  padding: 0 10px;
  background: ${colors.light.scheme.$gray10};
  overflow-y: auto;
`
