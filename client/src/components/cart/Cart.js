import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CartCardInfo from './CartCardInfo'
import CartList from './CartList'
import CartOrder from './CartOrder'
import getTotalPrice from '../modules/getTotalPrice'

const Cart = ({ userId, cartId }) => {
  const [receiveDataObj, setReceiveDataObj] = useState({})
  const [totalPrice, setTotalPrice] = useState('')

  useEffect(() => {
    const getData = getTotalPrice(userId, cartId)
    getData.then((response) => setTotalPrice(response))
  }, [])

  return (
    <Container>
      <CartList userId={userId} totalPrice={totalPrice} />
      <Row style={{ marginTop: 40 }}>
        <Col xs='6'>
          <CartOrder
            receiveDataObj={receiveDataObj}
            setReceiveDataObj={setReceiveDataObj}
          />
        </Col>
        <Col xs='6'>
          <CartCardInfo
            userId={userId}
            cartId={cartId}
            totalPrice={totalPrice}
            receiveDataObj={receiveDataObj}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
