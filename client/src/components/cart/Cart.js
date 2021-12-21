import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import CartCardInfo from './CartCardInfo'
import CartList from './CartList'
import CartOrder from './CartOrder'

const Cart = ({ userId, cartId }) => {
  return (
    <Container>
      <CartList userId={userId} cartId={cartId} />
      <Row style={{ marginTop: 40 }}>
        <Col xs='6'>
          <CartOrder />
        </Col>
        <Col xs='6'>
          <CartCardInfo />
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
