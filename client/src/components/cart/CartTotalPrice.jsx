import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CartTotalPrice({ userId, cartId }) {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    axios
      .post('api/cart?type=totalPrice', {
        cart_id: cartId,
        user_id: userId,
      })
      .then((response) => {
        setTotalPrice(response.data.json[0]['total_price'])
      })
  })

  return (
    <div style={{ textAlign: 'right', margin: '0 20px 0 0', fontSize: 20 }}>
      총 상품 가격은{' '}
      <b>{String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</b>{' '}
      입니다.
    </div>
  )
}
