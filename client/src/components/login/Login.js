import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, InputGroup, InputGroupText } from 'reactstrap'
import Swal from 'sweetalert2'
import cookie from 'react-cookies'

const Login = (props) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const fncLogin = () => {
    if (!(userEmail && userPassword)) {
      sweetalert('이메일과 비밀번호를 확인해주세요', '', 'info')
    }
    axios
      .post('/api/user?type=login', {
        user_email: userEmail,
        user_password: userPassword,
      })
      .then((response) => {
        if (response.data[0] === undefined) {
          sweetalert('아이디 또는 비밀번호가 일치하지 않습니다.', '', 'error')
          return
        }

        let user_email = response.data[0].user_email
        let user_name = response.data[0].user_name
        let user_pwd = response.data[0].user_password

        if (user_email) {
          sweetalert('로그인 되었습니다.', '', 'info', '닫기')

          // 로그인 후에 세션 유효기간 60분으로 설정하기
          const expires = new Date()
          expires.setMinutes(expires.getMinutes() + 60)
          axios
            .post('/api/user?type=webtoken', {
              user_email,
              user_name,
            })
            .then((response) => {
              // console.log(response.data)
              // console.log('token_id', response.data.token_id)
              // console.log('token_name', response.data.token_name)

              cookie.save('token_id', response.data.token_id, {
                path: '/', // 모든 url에 적용
                expires, // 위에서 선언한 세션 유효 기간
              })
              cookie.save('token_name', response.data.token_name, {
                path: '/', // 모든 url에 적용
                expires,
              })
              cookie.save('user_password', user_pwd, {
                path: '/',
                expires,
              })
            })
            .catch((error) => {
              sweetalert('작업중 오류가 발생했습니다.', error, 'error')
            })
          setTimeout(function () {
            window.location.href = '/naverApi'
          }, 1000)
        }
      })
  }

  const sweetalert = (title, showConfirmButton, icon) => {
    Swal.fire({
      position: 'bottom-end',
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: 1000,
    })
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'royalBlue',
        padding: '150px 200px',
      }}
    >
      <div
        style={{
          width: '60%',
          margin: '0 auto',
          padding: '30px 60px',
        }}
      >
        <h1 style={{ marginBottom: 20, color: 'white', textAlign: 'center' }}>
          로그인
        </h1>
        <InputGroup style={{ marginBottom: 20 }}>
          <InputGroupText style={{ display: 'block', width: 50 }}>
            @
          </InputGroupText>
          <Input
            placeholder='ID'
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupText style={{ display: 'block', width: 50 }}>
            PW
          </InputGroupText>
          <Input
            placeholder='Password'
            type='password'
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </InputGroup>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/register' style={{ color: 'white', margin: '20px 0 0 0' }}>
            회원가입
          </Link>
          <Button style={{ marginTop: 20 }} onClick={fncLogin}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
