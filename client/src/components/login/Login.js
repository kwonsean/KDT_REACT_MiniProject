import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
} from 'reactstrap'

const Login = (props) => {
  return (
    <Container>
      <div
        style={{
          width: '60%',
          margin: '0 auto',
          padding: '30px 60px',
          backgroundColor: 'royalBlue',
        }}
      >
        <h1 style={{ marginBottom: 20, color: 'white', textAlign: 'center' }}>
          로그인
        </h1>
        <InputGroup style={{ marginBottom: 20 }}>
          <InputGroupText style={{ display: 'block', width: 50 }}>
            @
          </InputGroupText>
          <Input placeholder='ID' />
        </InputGroup>
        <InputGroup>
          <InputGroupText style={{ display: 'block', width: 50 }}>
            PW
          </InputGroupText>
          <Input placeholder='Password' />
        </InputGroup>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/register' style={{ color: 'white', margin: '20px 0 0 0' }}>
            회원가입
          </Link>
          <Button style={{ marginTop: 20 }}>로그인</Button>
        </div>
      </div>
    </Container>
  )
}

export default Login
