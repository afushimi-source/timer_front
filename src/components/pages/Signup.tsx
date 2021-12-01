import { useForm, SubmitHandler } from 'react-hook-form'
import { memo, VFC, ChangeEvent, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Flex,
  Input,
  Stack,
  Link,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'

import { PrimaryButton } from '../atoms/button/PrimaryButton'
import { useAuth } from '../../hooks/useAuth'
import { FormWrapper } from '../molecules/FormWrapper'

type Inputs = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
    criteriaMode: 'all',
    shouldFocusError: false,
  })

  const onSubmitData: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
  }

  console.log(errors)

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <Stack spacing={6} py={4} px={10}>
          <FormControl isInvalid={!!errors?.email}>
            <Input
              placeholder="email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'emailは必須項目です',
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'メールアドレスの形式が不正です',
                },
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <PrimaryButton>ユーザー登録</PrimaryButton>
        </Stack>
      </form>
    </FormWrapper>
  )
}
