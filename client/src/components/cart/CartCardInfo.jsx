import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from 'reactstrap'
import Swal from 'sweetalert2'

const cardList = [
  '국민',
  '비씨',
  '신한',
  '현대',
  '삼성',
  '롯데',
  '외환',
  '농협',
  '하나',
  '우리',
  '광주',
  '수협',
  '씨티',
  '전북',
  '제주',
  '카카오뱅크',
  '케이뱅크',
]

export default function CartCardInfo({
  userId,
  cartId,
  totalPrice,
  receiveDataObj,
}) {
  const [cardDataObj, setCardDataObj] = useState({})
  const [cardNameValid, setCardNameValid] = useState(false)
  const [cardUserValid, setCardUserValid] = useState(false)
  const [cardNum1Valid, setCardNum1Valid] = useState(false)
  const [cardNum2Valid, setCardNum2Valid] = useState(false)
  const [cardNum3Valid, setCardNum3Valid] = useState(false)
  const [cardNum4Valid, setCardNum4Valid] = useState(false)
  const [cardMonthValid, setCardMonthValid] = useState(false)
  const [cardYearValid, setCardYearValid] = useState(false)
  const [changeInputCheck, setChangeInputCheck] = useState(true)

  const changeInput = (e) => {
    setCardDataObj((cur) => ({ ...cur, [e.target.id]: e.target.value }))
    setChangeInputCheck((cur) => !cur)
  }

  useEffect(() => {
    checkValid(cardDataObj)
    // console.log('cardDataObj', cardDataObj)
  }, [changeInputCheck])

  let defaultObj = {
    receive_user: null,
    receive_user_tel1: null,
    receive_user_tel2: null,
    receive_user_tel3: null,
    receive_address1: null,
    receive_address2: null,
    receive_address3: null,
    cart_dv: null,
    card_user: null,
    card_number1: null,
    card_number2: null,
    card_number3: null,
    card_number4: null,
    card_month: null,
    card_year: null,
    user_id: userId,
    cart_id: cartId,
    total_price: totalPrice,
    complete_yn: 'Y',
  }

  useEffect(() => {
    defaultObj = { ...defaultObj, ...receiveDataObj, ...cardDataObj }
    console.log('defa', defaultObj)
  }, [receiveDataObj, cardDataObj])

  const clickOrderBtn = () => {
    const iscorrectObj = checkTotalValid(defaultObj)
    console.log(defaultObj.receive_address1)
    if (iscorrectObj) {
      axios
        .post('api/cart?type=order', {
          receive_user: defaultObj.receive_user,
          receive_user_tel1: defaultObj.receive_user_tel1,
          receive_user_tel2: defaultObj.receive_user_tel2,
          receive_user_tel3: defaultObj.receive_user_tel3,
          receive_address1: defaultObj.receive_address1,
          receive_address2: defaultObj.receive_address2,
          receive_address3: defaultObj.receive_address3,
          cart_dv: defaultObj.cart_dv,
          card_user: defaultObj.card_user,
          card_number1: defaultObj.card_number1,
          card_number2: defaultObj.card_number2,
          card_number3: defaultObj.card_number3,
          card_number4: defaultObj.card_number4,
          card_month: defaultObj.card_month,
          card_year: defaultObj.card_year,
          user_id: userId,
          cart_id: cartId,
          total_price: totalPrice,
          complete_yn: 'Y',
        })
        .then((orderResponse) =>
          console.log('orderResponse', orderResponse.data)
        )
        .catch((orderError) => console.log('orderError', orderError))
      axios
        .post('api/cart?type=modify', {
          cart_id: cartId,
          complete_yn: 'Y',
          product_id: '',
          user_id: userId,
        })
        .then((orderCompleteResponse) =>
          console.log('orderCompleteResponse', orderCompleteResponse.data)
        )
        .catch((orderCompleteError) =>
          console.log('orderErorderCompleteErroror', orderCompleteError)
        )
    }
  }

  function checkTotalValid(obj) {
    if (!obj.receive_user) {
      alertNullData('받는 사람')
      return
    }
    if (
      !obj.receive_user_tel1 ||
      !obj.receive_user_tel2 ||
      !obj.receive_user_tel3
    ) {
      alertNullData('전화 번호')
      return
    }

    if (
      !obj.receive_address1 ||
      !obj.receive_address2 ||
      !obj.receive_address3
    ) {
      alertNullData('배송지 주소')
      return
    }

    if (!obj.cart_dv) {
      alertNullData('카드 선택')
      return
    }
    if (!obj.card_user) {
      alertNullData('카드 소유자명')
      return
    }
    if (
      !obj.card_number1 ||
      !obj.card_number2 ||
      !obj.card_number3 ||
      !obj.card_number4
    ) {
      alertNullData('카드 번호')
      return
    }
    if (!obj.card_month || !obj.card_year) {
      alertNullData('카드 MM/YY')
      return
    }

    return true
  }

  return (
    <Card>
      <CardHeader>
        <h3>결제</h3>
      </CardHeader>
      <CardBody>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'>
            <Label for='cart_dv' style={{ fontSize: 18, margin: '4px 0' }}>
              카드 선택
            </Label>
          </Col>
          <Col xs='9'>
            <Input
              valid={cardNameValid}
              invalid={!cardNameValid}
              id='cart_dv'
              type='select'
              onChange={(e) => changeInput(e)}
            >
              <option>카드를 선택해주세요</option>
              {cardList.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'>
            <Label for='card_user' style={{ fontSize: 18, margin: '4px 0' }}>
              성함
            </Label>
          </Col>
          <Col xs='9'>
            <Input
              valid={cardUserValid}
              invalid={!cardUserValid}
              id='card_user'
              placeholder='카드 소유자명'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'>
            <Label for='card_number1' style={{ fontSize: 18, margin: '4px 0' }}>
              카드 번호
            </Label>
          </Col>
          <Col xs='2'>
            <Input
              valid={cardNum1Valid}
              invalid={!cardNum1Valid}
              id='card_number1'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
          <Col xs='2'>
            <Input
              valid={cardNum2Valid}
              invalid={!cardNum2Valid}
              id='card_number2'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
          <Col xs='2'>
            <Input
              valid={cardNum3Valid}
              invalid={!cardNum3Valid}
              id='card_number3'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
          <Col xs='2'>
            <Input
              valid={cardNum4Valid}
              invalid={!cardNum4Valid}
              id='card_number4'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'>
            {' '}
            <Label for='card_month' style={{ fontSize: 18, margin: '4px 0' }}>
              MM/YY
            </Label>
          </Col>
          <Col xs='3'>
            <Input
              valid={cardMonthValid}
              invalid={!cardMonthValid}
              id='card_month'
              placeholder='Month'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
          <Col xs='1' style={{ textAlign: 'center' }}>
            /
          </Col>
          <Col xs='3'>
            <Input
              valid={cardYearValid}
              invalid={!cardYearValid}
              id='card_year'
              placeholder='Year'
              onChange={(e) => changeInput(e)}
            ></Input>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Button
          style={{ width: '80%', display: 'block', margin: '0 auto' }}
          onClick={clickOrderBtn}
        >
          결제
        </Button>
      </CardFooter>
    </Card>
  )

  function checkValid(obj) {
    const {
      cart_dv: cardName = '',
      card_user: cardUser = '',
      card_number1: cardNum1 = '',
      card_number2: cardNum2 = '',
      card_number3: cardNum3 = '',
      card_number4: cardNum4 = '',
      card_month: cardMonth = '',
      card_year: cardYear = '',
    } = obj

    // cardName Valid 검사
    if (cardName !== '카드를 선택해주세요' && cardName !== '')
      setCardNameValid(true)
    else {
      setCardNameValid(false)
      setCardDataObj((cur) => ({ ...cur, cart_dv: undefined }))
    }

    // cardUser Valid 검사
    if (
      cardUser.length > 0 &&
      /[^0-9]/g.test(cardUser) &&
      cardUser.trim() !== ''
    )
      setCardUserValid(true)
    else {
      setCardUserValid(false)
      setCardDataObj((cur) => ({ ...cur, card_user: undefined }))
    }

    // cardNum1,2,3,4 Valid 검사
    if (cardNum1.length === 4 && !/[^0-9]/g.test(cardNum1))
      setCardNum1Valid(true)
    else {
      setCardNum1Valid(false)
      setCardDataObj((cur) => ({ ...cur, card_number1: undefined }))
    }

    if (cardNum2.length === 4 && !/[^0-9]/g.test(cardNum2))
      setCardNum2Valid(true)
    else {
      setCardNum2Valid(false)
      setCardDataObj((cur) => ({ ...cur, card_number2: undefined }))
    }

    if (cardNum3.length === 4 && !/[^0-9]/g.test(cardNum3))
      setCardNum3Valid(true)
    else {
      setCardNum3Valid(false)
      setCardDataObj((cur) => ({ ...cur, card_number3: undefined }))
    }

    if (cardNum4.length === 4 && !/[^0-9]/g.test(cardNum4))
      setCardNum4Valid(true)
    else {
      setCardNum4Valid(false)
      setCardDataObj((cur) => ({ ...cur, card_number4: undefined }))
    }

    // cardMonth, Year Valid 검사
    if (
      cardMonth.length === 2 &&
      !/[^0-9]/g.test(cardMonth) &&
      Number(cardMonth) <= 12
    )
      setCardMonthValid(true)
    else {
      setCardMonthValid(false)
      setCardDataObj((cur) => ({ ...cur, card_month: undefined }))
    }

    if (cardYear.length === 2 && !/[^0-9]/g.test(cardYear))
      setCardYearValid(true)
    else {
      setCardYearValid(false)
      setCardDataObj((cur) => ({ ...cur, card_year: undefined }))
    }
  }
}

function alertNullData(nullData) {
  Swal.fire({
    title: `정보를 모두 정확히 입력해 주세요!`,
    text: `'${nullData}' 부분을 수정하세요!`,
    icon: 'error',
    confirmButtonText: '확인',
  })
}
