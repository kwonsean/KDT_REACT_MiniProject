import React from 'react'

export default function CartTotalPrice({ totalPrice }) {
  return (
    <div style={{ textAlign: 'right', margin: '0 20px 0 0', fontSize: 20 }}>
      총 상품 가격은{' '}
      <b>{String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</b>{' '}
      입니다.
    </div>
  )
}
