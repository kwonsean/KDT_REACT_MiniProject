import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Chart from './Chart'
import ChartDetail from './ChartDetail'
import HistoryList from './HistoryList'
import HistorySearch from './HistorySearch'

const year = String(new Date().getFullYear())
const month = String(new Date().getMonth() + 1)
const day = String(new Date().getDate())
const today = year + month + day

const History = ({ userId }) => {
  const [selectedCategory, setSelectedCategory] = useState('없음')
  const [orderList, setOrderList] = useState([])

  function getOrderList(startDate = '20211220', endDate = today) {
    axios
      .post('api/order?type=list', {
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
      })
      .then((response) => {
        setOrderList(response.data.json)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getOrderList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h2>사용자 구매내역</h2>
      <div
        style={{
          width: '95%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Chart userId={userId} setSelectedCategory={setSelectedCategory} />
        <ChartDetail userId={userId} selectedCategory={selectedCategory} />
      </div>
      <HistorySearch getOrderList={getOrderList} />
      <HistoryList userId={userId} orderList={orderList} />
    </Container>
  )
}

export default History
