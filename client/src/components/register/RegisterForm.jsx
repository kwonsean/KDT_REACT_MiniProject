import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import Swal from 'sweetalert2'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [id, setid] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [pw, setpw] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [major, setMajor] = useState('')
  const [org, setOrg] = useState('')
  const [isDuplicate, setIsDuplicate] = useState(true)

  const changeInput = (e) => {
    if (e.target.id === 'name') setName(e.target.value)
    if (e.target.id === 'ID') setid(e.target.value)
    if (e.target.id === 'emailAddress') setEmailAddress(e.target.value)
    if (e.target.id === 'PW') setpw(e.target.value)
    if (e.target.id === 'phoneNum') setPhoneNum(e.target.value)
    if (e.target.id === 'major') setMajor(e.target.value)
    if (e.target.id === 'org') setOrg(e.target.value)
  }

  const checkDuplicate = () => {
    if (id === '' || emailAddress === '') {
      fail('아이디와 이메일을 입력해 주세요')
      return
    }
    axios
      .post('api/user?type=dplicheck', {
        user_email1: id,
        user_email2: emailAddress,
      })
      .then((response) => {
        // console.log(response.data.json[0].dupliEmailCount)
        if (!response.data.json[0].dupliEmailCount) {
          setIsDuplicate(false)
          success(`사용 가능한 아이디 입니다.`)
        } else {
          setIsDuplicate(true)
          fail('중복된 아이디 입니다.')
        }
      })
      .catch((error) => console.log(error))
  }

  const clickInsertUserBtn = () => {
    if (name === '') {
      fail('회원가입에 실패하였습니다.', '이름을 입력해주세요')
      return
    }
    if (isDuplicate) {
      fail('회원가입에 실패하였습니다.', '아이디 중복체크를 해주세요')
      return
    }
    if (pw === '') {
      fail('회원가입에 실패하였습니다.', '비밀번호를 입력해주세요')
      return
    }
    axios
      .post('api/user?type=signup', {
        user_email1: id,
        user_email2: emailAddress,
        user_password: pw,
        user_major: major,
        user_phone: phoneNum,
        user_name: name,
        user_org: org,
      })
      .then((response) => {
        // console.log(response)
        success(`회원가입에 성공하였습니다!`)
        setTimeout(() => {
          window.location.href = '/naverApi'
        }, 2000)
      })
      .catch((error) => console.log(error))
  }
  // useEffect(() => {
  //   console.log(userData)
  // }, [userData])
  return (
    <div
      style={{
        padding: 35,
        borderRadius: 10,
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
      }}
    >
      <Row style={{ marginBottom: 20 }}>
        <Col xs='2'>
          <Label for='name'>이름</Label>
        </Col>
        <Col xs='3'>
          <Input
            id='name'
            placeholder='이름을 입력하세요'
            maxLength={20}
            onChange={(e) => changeInput(e)}
            value={name}
          ></Input>
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col xs='2'>
          <Label for='ID'>아이디 (이메일 형식)</Label>
        </Col>
        <Col xs='3'>
          <Input
            id='ID'
            placeholder='ID'
            onChange={(e) => changeInput(e)}
            value={id}
          ></Input>
        </Col>
        @
        <Col xs='3'>
          <Input
            id='emailAddress'
            placeholder='e-mail 주소'
            type='select'
            onChange={(e) => changeInput(e)}
          >
            <option value=''>이메일을 선택하세요</option>
            <option value='gmail.com'>구글</option>
            <option value='naver.com'>네이버</option>
            <option value='kakao.com'>카카오</option>
          </Input>
        </Col>
        <Col xs='2'>
          <Button onClick={checkDuplicate}>중복 확인</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col xs='2'>
          <Label for='PW'>비밀번호</Label>
        </Col>
        <Col xs='3'>
          <Input
            id='PW'
            placeholder='비밀번호를 입력하세요'
            type='password'
            maxLength={100}
            value={pw}
            onChange={(e) => changeInput(e)}
          ></Input>
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col xs='2'>
          <Label for='phoneNum'>전화번호</Label>
        </Col>
        <Col xs='3'>
          <Input
            id='phoneNum'
            placeholder='전화번호를 입력하세요 (선택)'
            minLength={13}
            maxLength={13}
            value={phoneNum}
            onChange={(e) => changeInput(e)}
          ></Input>
        </Col>
        ex) 010-1234-5678
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col xs='2'>
          <Label for='phoneNum'>전공</Label>
        </Col>
        <Col xs='3'>
          <Input
            id='major'
            placeholder='전공을 입력해주세요 (선택)'
            maxLength={100}
            value={major}
            onChange={(e) => changeInput(e)}
          ></Input>
        </Col>
        <Col xs='1'></Col>
        <Col xs='2'>
          <Label for='phoneNum'>직업</Label>
        </Col>
        <Col xs='3'>
          <Input
            id='org'
            placeholder='직업을 입력해주세요 (선택)'
            maxLength={100}
            value={org}
            onChange={(e) => changeInput(e)}
          ></Input>
        </Col>
        <Col xs='1'></Col>
      </Row>
      <Row>
        <Button
          style={{ width: '60%', margin: '0 auto' }}
          onClick={clickInsertUserBtn}
        >
          회원 가입
        </Button>
      </Row>
    </div>
  )
}

function fail(message, subMessage) {
  Swal.fire({
    title: message,
    text: subMessage,
    icon: 'error',
    confirmButtonText: '확인',
  })
}

function success(message) {
  Swal.fire({
    title: message,
    icon: 'success',
    confirmButtonText: '확인',
    timer: 1200,
  })
}
