import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap'
import HistoryBody from './HistoryBody'

export default function HistoryList({ userId, orderList }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {orderList.length > 0 ? (
        orderList.map((item) => (
          <Card
            style={{
              margin: '0 2.5% 20px 2.5%',
              width: '45%',
              boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
            }}
            key={item.order_id}
          >
            <CardHeader>
              <h6 style={{ display: 'inline-block', marginRight: 10 }}>
                주문 번호
              </h6>{' '}
              <span> {item.order_id}</span>
            </CardHeader>
            <CardBody style={{ maxHeight: 400, overflow: 'scroll' }}>
              <HistoryBody item={item} userId={userId} />
            </CardBody>
            <CardFooter style={{ textAlign: 'right' }}>
              전체 결제 금액
              <b style={{ marginLeft: 5 }}>
                {String(item.total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              </b>{' '}
              원
            </CardFooter>
          </Card>
        ))
      ) : (
        <div
          style={{
            padding: 30,
            margin: '0 auto',

            fontSize: 30,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          검색결과가 없습니다!
        </div>
      )}
    </div>
  )
}
