import { memo, VFC, ChangeEvent, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Input, Stack, Link } from '@chakra-ui/react'

import { PrimaryButton } from '../atoms/button/PrimaryButton'
import { useAuth } from '../../hooks/useAuth'
import { FormWrapper } from '../molecules/FormWrapper'

export const Login: VFC = memo(() => {
  const history = useHistory()
  const { login, loading } = useAuth()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setValues({ ...values, [target.name]: target.value })
  }
  const clearInput = () => {
    setValues({
      email: '',
      password: '',
    })
  }
  const onClickLogin = () => {
    const result: boolean = login(values.email, values.password)
    if (result) clearInput()
  }
  const onClickSignup = useCallback(() => history.push('/signup'), [])
  return (
    <FormWrapper>
      <Stack spacing={6} py={4} px={10}>
        <Input
          name="email"
          type="email"
          placeholder="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <PrimaryButton
          loading={loading}
          disabled={values.email === ''}
          onClick={onClickLogin}
        >
          ログイン
        </PrimaryButton>
      </Stack>
      <Flex justify="flex-end">
        <Link
          color="blue.800"
          cursor="pointer"
          _hover={{ textDecoration: 'none', opacity: '0.8' }}
          onClick={onClickSignup}
        >
          ユーザー登録
        </Link>
      </Flex>
    </FormWrapper>
  )
})
