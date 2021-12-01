import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

import Registration from './auth/Registration'
import Login from './auth/Login'
import { User } from '../types/api/user'

type Props = {
  loggedInStatus: string
  handleLogin: (data: Data) => void
}

type Data = {
  status: string
  user: User
}

const Home: VFC<Props> = (props) => {
  const history = useHistory()
  const { loggedInStatus, handleLogin } = props
  const handleSuccessfulAuthentication = (data: Data) => {
    handleLogin(data)
    history.push('/')
  }
  return (
    <div>
      <h1>Home</h1>
      <h2>{loggedInStatus}</h2>
      <Registration
        handleSuccessfulAuthentication={handleSuccessfulAuthentication}
      />
      <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
    </div>
  )
}

export default Home
