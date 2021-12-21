import React from 'react'
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

export default function CartCardInfo() {
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
            <Input id='cart_dv' type='select'>
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
            <Input id='card_user' placeholder='카드 소유자명'></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'>
            <Label for='card_number1' style={{ fontSize: 18, margin: '4px 0' }}>
              카드 번호
            </Label>
          </Col>
          <Col xs='2'>
            <Input id='card_number1'></Input>
          </Col>
          <Col xs='2'>
            <Input id='card_number2'></Input>
          </Col>
          <Col xs='2'>
            <Input id='card_number3'></Input>
          </Col>
          <Col xs='2'>
            <Input id='card_number4'></Input>
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
            <Input id='card_month' placeholder='Month'></Input>
          </Col>
          <Col xs='1' style={{ textAlign: 'center' }}>
            /
          </Col>
          <Col xs='3'>
            <Input id='card_year' placeholder='Year'></Input>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Button style={{ width: '80%', display: 'block', margin: '0 auto' }}>
          결제
        </Button>
      </CardFooter>
    </Card>
  )
}
