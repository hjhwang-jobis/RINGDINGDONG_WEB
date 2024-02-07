import styled from '@emotion/styled'
import React from 'react'
import { Outlet } from 'react-router-dom'

import RequireAuth from '~/components/RequireAuth'

import Content from './Content'
import ContentRow from './ContentRow'
import SideNav from './SideNav'
import TopNav from './TopNav'

function Layout() {
  return (
    <RequireAuth>
      <Container>
        <TopNav />
        <ContentRow>
          <>
            <SideNav />
            <Content>
              <Outlet />
            </Content>
          </>
        </ContentRow>
      </Container>
    </RequireAuth>
  )
}

export default Layout

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: red;
  position: relative;
`
