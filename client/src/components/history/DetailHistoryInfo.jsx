import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import styled from '../naver/ShoppingList.module.css'

export default function DetailHistoryInfo({
  order_id,
  user_id,
  setShowDetail,
  showDetail,
}) {
  const [item, setItem] = useState([])

  useEffect(() => {
    axios
      .post('api/order?type=orderDetail', {
        user_id,
        order_id,
      })
      .then((response) => setItem(response.data.json))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div style={{ padding: 5 }}>
      <Row className={styled.rowTitle}>
        <Col xs='1'></Col>
        <Col xs='5'>구매 상품 정보</Col>
        <Col xs='2'></Col>
        <Col xs='2'>수량</Col>
        <Col xs='2'>가격</Col>
      </Row>
      {item.map((item) => (
        <Row key={item.productId} className={styled.row}>
          <Col xs='2'>
            <img alt='item' src={item.image} width='100%' />
          </Col>
          <Col xs='6'>
            <h5
              className={styled.title}
              style={{ fontSize: 14 }}
              dangerouslySetInnerHTML={{
                __html: item.title,
              }}
            ></h5>
          </Col>
          <Col xs='2'>
            <span>{item.amount}</span>
          </Col>
          <Col xs='2'>
            <span>{item.l_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</span>
          </Col>
        </Row>
      ))}
      <Row>
        <Col sx='8'></Col>
        <Col xs='4' style={{ textAlign: 'right' }}>
          <Button onClick={() => setShowDetail(!showDetail)}>
            결제 정보 보기
          </Button>
        </Col>
      </Row>
    </div>
  )
}
