import { Route, Switch } from 'react-router-dom'

import { Login } from '../components/pages/Login'
import { LoginUserProvider } from '../hooks/providers/useLoginUserProvider'
import { Signup } from '../components/pages/Signup'
import { Page404 } from '../components/pages/Page404'

export const Router = () => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  )
}
