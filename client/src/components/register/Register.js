import React from 'react'
import { Container } from 'reactstrap'
import RegisterForm from './RegisterForm'

const Register = (props) => {
  return (
    <Container>
      <h2>회원가입</h2>
      <RegisterForm />
    </Container>
  )
}

export default Register
