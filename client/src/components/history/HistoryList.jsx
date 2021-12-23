import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap'
import DefaultHistoryInfo from './DefaultHistoryInfo'
import DetailHistoryInfo from './DetailHistoryInfo'

const year = String(new Date().getFullYear())
const month = String(new Date().getMonth() + 1)
const day = String(new Date().getDate())

export default function HistoryList({ userId }) {
  const [orderList, setOrderList] = useState([])
  const [showDetail, setShowDetail] = useState(true)

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

  const clickBody = () => {
    setShowDetail((cur) => !cur)
  }

  console.log(orderList)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {orderList.map((item) => (
        <Card style={{ margin: '0 2.5% 20px 2.5%', width: '45%' }}>
          <CardHeader>
            <h6 style={{ display: 'inline-block', marginRight: 10 }}>
              주문 번호
            </h6>{' '}
            <span> {item.order_id}</span>
          </CardHeader>
          <CardBody style={{ maxHeight: 400, overflow: 'scroll' }}>
            {showDetail ? (
              <DefaultHistoryInfo
                item={item}
                setShowDetail={setShowDetail}
                showDetail={showDetail}
              />
            ) : (
              <DetailHistoryInfo
                order_id={item.order_id}
                user_id={userId}
                setShowDetail={setShowDetail}
                showDetail={showDetail}
              />
            )}
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
