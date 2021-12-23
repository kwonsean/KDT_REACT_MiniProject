import React from 'react'
import { Button, Col, Row } from 'reactstrap'

export default function DefaultHistoryInfo({
  item,
  setShowDetail,
  showDetail,
}) {
  return (
    <div>
      <Row>
        <Col xs='3'>결제자 명</Col>
        <Col xs='9'>{item.card_user}</Col>
      </Row>
      <Row>
        <Col xs='3'>사용한 카드</Col>
        <Col xs='3'>{item.cart_dv} 카드</Col>
        <Col xs='4'>
          {item.card_number1} **** **** {item.card_number4}
        </Col>
        <Col xs='2'>
          {item.card_month} / {item.card_year}
        </Col>
      </Row>
      <Row>
        <Col xs='3'>결제 날짜</Col>
        <Col xs='9'>{item.insert_date}</Col>
      </Row>
      <Row>
        <Col sx='9'></Col>
        <Col xs='3'>
          <Button onClick={() => setShowDetail(!showDetail)}>
            상세 정보 보기
          </Button>
        </Col>
      </Row>
    </div>
  )
}
