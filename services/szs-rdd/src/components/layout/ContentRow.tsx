import styled from '@emotion/styled'

function ContentRow({ children }: { children: JSX.Element }) {
  return <Container>{children}</Container>
}

export default ContentRow

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background: grey;
  display: flex;
  justify-content: space-between;
`
