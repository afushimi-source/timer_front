import { ChangeEvent, useState, FormEvent, VFC } from 'react'
import axios from 'axios'

import { User } from '../../types/api/user'

// type NoLoginUserData = {

// }

// type LoginUserData = {
//   status: string
//   logged_in: boolean;
//   user: User;
// }
type Data = {
  status: string
  user: User
}
type Props = {
  handleSuccessfulAuthentication: (data: Data) => void
}

const Login: VFC<Props> = (props) => {
  const { handleSuccessfulAuthentication } = props
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event: FormEvent) => {
    axios
      .post(
        'http://localhost:3001/login',
        {
          user: {
            email: values.email,
            password: values.password,
          },
        },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.data.status === 'created') {
          handleSuccessfulAuthentication(response.data)
        }
      })
      .catch((err) => console.log(err))
    event.preventDefault()
  }
  return (
    <div>
      <p>ログイン</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
export default Login
