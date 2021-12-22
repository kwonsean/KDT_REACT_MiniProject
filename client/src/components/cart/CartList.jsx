import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import styled from '../naver/ShoppingList.module.css'
import CartTotalPrice from './CartTotalPrice'

export default function CartList({ userId, totalPrice, orderCheck }) {
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    axios
      .post('api/cart?type=list', {
        user_id: userId,
      })
      .then((response) => {
        const data = response.data.json
        setCartList(data)
      })
      .catch((error) => console.log(error))
  }, [orderCheck])

  return (
    <div>
      <Card>
        <CardHeader>
          <h3>장바구니 목록</h3>
        </CardHeader>
        <CardBody
          style={{
            padding: 40,
            // height: 500,
            overflow: 'scroll',
          }}
        >
          {cartList.length > 0 ? (
            <Row className={styled.rowTitle}>
              <Col xs='1'>상품이미지</Col>
              <Col xs='6'>상품 명</Col>
              <Col xs='2'>가격</Col>
              <Col xs='1'>수량</Col>
              <Col xs='2'>합산 가격</Col>
            </Row>
          ) : (
            <h4 style={{ textAlign: 'center' }}>
              장바구니에 담긴 물건이 없습니다.
            </h4>
          )}
          {cartList.length > 0 &&
            cartList.map((item) => {
              const htmlTitle = item.title
              return (
                <Row key={item.productId} className={styled.row}>
                  <Col xs='1'>
                    <img alt='item' src={item.image} width='100%' />
                  </Col>
                  <Col xs='6'>
                    <h5
                      className={styled.title}
                      dangerouslySetInnerHTML={{ __html: htmlTitle }}
                    ></h5>
                  </Col>
                  <Col xs='2'>
                    <span>
                      {item.l_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                    </span>
                  </Col>
                  <Col xs='1'>
                    <span>{item.amount}</span>
                  </Col>
                  <Col xs='2'>
                    <span>
                      {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                    </span>
                  </Col>
                </Row>
              )
            })}
        </CardBody>
        <CardFooter>
          <CartTotalPrice totalPrice={totalPrice} />
        </CardFooter>
      </Card>
    </div>
  )
}
