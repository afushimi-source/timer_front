import { useCallback, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { useMessage } from './useMessage'
import { useLoginUser } from './providers/useLoginUserProvider'

export const useAuth = () => {
  axios.defaults.baseURL = process.env.REACT_APP_DEV_API_URL
  const { showMessage } = useMessage()
  const { setLoginUser } = useLoginUser()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const signup = useCallback(() => {}, [])

  const login = useCallback(
    (email: string, password: string): boolean => {
      setLoading(true)
      let result = false
      axios
        .post(
          'http://localhost:3001/login',
          {
            user: {
              email: email,
              password: password,
            },
          },
          { withCredentials: true },
        )
        .then((res) => {
          if (res.data.status === 200) {
            result = true
            setLoginUser(res.data.user)
            showMessage({ title: 'ログインしました', status: 'success' })
            history.push('/home') //ログイン後の画面推移
          } else {
            showMessage({ title: res.data.errors.join(''), status: 'error' })
          }
          setLoading(false)
        })
        .catch(() => {
          console.log('err')
          showMessage({ title: 'ログインできません', status: 'error' })
          setLoading(false)
        })
      return result
    },
    [history, showMessage, setLoginUser],
  )
  return { signup, login, loading }
}
