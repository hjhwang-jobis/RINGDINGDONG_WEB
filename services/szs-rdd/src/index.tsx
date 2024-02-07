import { Provider as MystiqueProvider } from '@3o3/mystique-components'
import { GlobalModal } from '@3o3-internal/components'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import { queryClient } from '~/api/reactQuery'
import AuthProvider from '~/components/AuthProvider'
import { GlobalStyle } from '~/components/GlobalStyles'
import ErrorBoundary from '~/pages/ErrorPage/ErrorBoundary'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <MystiqueProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <GlobalModal key="modal-key" />
            <AuthProvider>
              <App />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </MystiqueProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
