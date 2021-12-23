import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Input } from 'reactstrap'
import HistoryBody from './HistoryBody'

const year = String(new Date().getFullYear())
const month = String(new Date().getMonth() + 1)
const day = String(new Date().getDate())

export default function HistoryList({ userId }) {
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    axios
      .post('api/order?type=list', {
        user_id: userId,
        start_date: '20211220',
        end_date: year + month + day,
      })
      .then((response) => {
        setOrderList(response.data.json)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {orderList.map((item) => (
        <Card
          style={{ margin: '0 2.5% 20px 2.5%', width: '45%' }}
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
      ))}
    </div>
  )
}
