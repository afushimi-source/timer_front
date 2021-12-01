import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { VFC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import theme from './theme/theme'
import { HeaderLayout } from './components/templates/HeaderLayout'
import { Router } from './router/Router'

const App: VFC = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン')
  const [user, setUser] = useState({})

  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <HeaderLayout>
            <Router />
          </HeaderLayout>
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App
