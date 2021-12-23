import React, { useState } from 'react'
import { Container } from 'reactstrap'
import Chart from './Chart'
import ChartDetail from './ChartDetail'
import HistoryList from './HistoryList'

const History = ({ userId }) => {
  const [selectedCategory, setSelectedCategory] = useState('없음')
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
      <HistoryList userId={userId} />
    </Container>
  )
}

export default History
