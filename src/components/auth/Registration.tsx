import { ChangeEvent, useState, FormEvent, VFC } from 'react'
import axios from 'axios'

import { User } from '../../types/api/user'

type Data = {
  status: string
  user: User
}
type Props = {
  handleSuccessfulAuthentication: (data: Data) => void
}

const Registration: VFC<Props> = (props) => {
  const { handleSuccessfulAuthentication } = props
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
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
        'http://localhost:3001/signup',
        {
          user: {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
          },
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          handleSuccessfulAuthentication(response.data)
        } else {
          console.log('err')
        }
      })
      .catch((err) => console.log(err))
    event.preventDefault()
  }
  return (
    <div>
      <p>新規登録</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={values.name}
          onChange={handleInputChange}
        />
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="password_confirmation"
          value={values.password_confirmation}
          onChange={handleInputChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
export default Registration
