import React from 'react'
import { Container } from 'reactstrap'
import HistoryList from './HistoryList'

const History = ({ cartId, userId }) => {
  return (
    <Container>
      <h2>사용자 구매내역</h2>
      <HistoryList userId={userId} />
    </Container>
  )
}

export default History
