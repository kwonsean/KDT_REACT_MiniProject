import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap'

export default function CartOrder({ receiveDataObj, setReceiveDataObj }) {
  const [nameValid, setNameValid] = useState(false)
  const [tel1Valid, setTel1Valid] = useState(false)
  const [tel2Valid, setTel2Valid] = useState(false)
  const [tel3Valid, setTel3Valid] = useState(false)
  const [adr1Valid, setAdr1Valid] = useState(false)
  const [adr2Valid, setAdr2Valid] = useState(false)
  const [adr3Valid, setAdr3Valid] = useState(false)
  const [changeInputCheck, setChangeInputCheck] = useState(true)

  const changeInput = (e) => {
    setReceiveDataObj((cur) => ({ ...cur, [e.target.id]: e.target.value }))
    setChangeInputCheck((cur) => !cur)
  }

  useEffect(() => {
    checkValid(receiveDataObj)
    // console.log(receiveDataObj)
  }, [changeInputCheck])

  return (
    <Card>
      <CardHeader>
        <h3>배송지</h3>
      </CardHeader>
      <CardBody>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'>
            <Label for='receive_user' style={{ fontSize: 18, margin: '4px 0' }}>
              받는 사람
            </Label>
          </Col>
          <Col xs='9'>
            <Input
              valid={nameValid}
              invalid={!nameValid}
              id='receive_user'
              placeholder='받는 사람 이름을 입력하세요.'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'>
            <Label
              for='receive_user_tel1'
              style={{ fontSize: 18, margin: '4px 0' }}
            >
              전화 번호
            </Label>
          </Col>
          <Col xs='2'>
            <Input
              valid={tel1Valid}
              invalid={!tel1Valid}
              id='receive_user_tel1'
              maxLength={3}
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
          <Col xs='1' style={{ textAlign: 'center' }}>
            <span>—</span>
          </Col>
          <Col xs='2'>
            <Input
              valid={tel2Valid}
              invalid={!tel2Valid}
              id='receive_user_tel2'
              maxLength={4}
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
          <Col xs='1' style={{ textAlign: 'center' }}>
            <span>—</span>
          </Col>
          <Col xs='2'>
            <Input
              valid={tel3Valid}
              invalid={!tel3Valid}
              id='receive_user_tel3'
              maxLength={4}
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'>
            <Label
              for='receive_address1'
              style={{ fontSize: 18, margin: '4px 0' }}
            >
              배송지 주소
            </Label>
          </Col>
          <Col xs='9'>
            <Input
              valid={adr1Valid}
              invalid={!adr1Valid}
              id='receive_address1'
              placeholder='시/도를 입력하세요.'
              onChange={(e) => changeInput(e)}
            ></Input>
            <FormFeedback>ex. 인천광역시</FormFeedback>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'></Col>
          <Col xs='9'>
            <Input
              valid={adr2Valid}
              invalid={!adr2Valid}
              id='receive_address2'
              placeholder='도로명을 입력하세요. '
              onChange={(e) => changeInput(e)}
            ></Input>
            <FormFeedback>ex. 아나지로332</FormFeedback>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'></Col>
          <Col xs='9'>
            <Input
              valid={adr3Valid}
              invalid={!adr3Valid}
              id='receive_address3'
              placeholder='상세주소를 입력하세요. '
              onChange={(e) => changeInput(e)}
            ></Input>
            <FormFeedback>ex. 101동 101호</FormFeedback>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )

  function checkValid(obj) {
    const {
      receive_user: user = '',
      receive_user_tel1: tel1 = '',
      receive_user_tel2: tel2 = '',
      receive_user_tel3: tel3 = '',
      receive_address1: adr1 = '',
      receive_address2: adr2 = '',
      receive_address3: adr3 = '',
    } = obj

    // user valid 검사
    if (user.length > 0 && /[^0-9]/g.test(user)) setNameValid(true)
    else {
      setNameValid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_user: undefined }))
    }

    // tel1,2,3 valid 검사
    if (tel1.length === 3 && !/[^0-9]/g.test(tel1)) setTel1Valid(true)
    else {
      setTel1Valid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_user_tel1: undefined }))
    }

    if (tel2.length === 4 && !/[^0-9]/g.test(tel2)) setTel2Valid(true)
    else {
      setTel2Valid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_user_tel2: undefined }))
    }

    if (tel3.length === 4 && !/[^0-9]/g.test(tel3)) setTel3Valid(true)
    else {
      setTel3Valid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_user_tel3: undefined }))
    }

    // adr1,2,3 valid 검사
    if (adr1.length > 0 && /[^0-9]/g.test(adr1) && /[시,도]$/g.test(adr1))
      setAdr1Valid(true)
    else {
      setAdr1Valid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_address1: undefined }))
    }

    if (adr2.length > 3) setAdr2Valid(true)
    else {
      setAdr2Valid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_address2: undefined }))
    }

    if (adr3.length > 3 && /^[1-9]/g.test(adr3) && /[호]$/g.test(adr3))
      setAdr3Valid(true)
    else {
      setAdr3Valid(false)
      setReceiveDataObj((cur) => ({ ...cur, receive_address3: undefined }))
    }
  }
}
