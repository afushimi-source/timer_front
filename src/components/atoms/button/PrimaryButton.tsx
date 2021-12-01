import { memo, VFC, ReactNode } from 'react'
import { Button } from '@chakra-ui/react'
import _ from 'lodash'

type Props = {
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}
export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false, loading = false, onClick } = props
  return (
    <Button
      type="submit"
      bg="teal.400"
      color="white"
      _hover={{ opacity: '0.8' }}
      isLoading={loading}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
})
