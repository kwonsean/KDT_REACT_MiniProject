import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import Swal from 'sweetalert2'

export default function HistorySearch({ getOrderList }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const searchOrderList = () => {
    if (startDate === '' || endDate === '') {
      noDate()
      return
    }
    getOrderList(startDate, endDate)
  }
  return (
    <Row style={{ textAlign: 'right', margin: '0 2.5% 20px' }}>
      <Col xs='2'>
        <span style={{ fontSize: 17 }}>날짜별 주문 내역 검색</span>
      </Col>
      <Col xs='1'></Col>
      <Col xs='1'>시작 날짜</Col>
      <Col xs='3'>
        <Input
          type='date'
          onChange={(e) => {
            let firstDate = e.target.value
            firstDate = firstDate.replace(/-/g, '')
            setStartDate(firstDate)
          }}
        />
      </Col>
      <Col xs='1'>마지막 날짜</Col>
      <Col xs='3'>
        <Input
          type='date'
          onChange={(e) => {
            let lastDate = e.target.value
            lastDate = lastDate.replace(/-/g, '')
            setEndDate(lastDate)
          }}
        />
      </Col>
      <Col xs='1' style={{ textAlign: 'left' }}>
        <Button onClick={searchOrderList}>검색</Button>
      </Col>
    </Row>
  )
}

function noDate() {
  Swal.fire({
    title: `날짜를 모두 선택해 주세요!`,
    icon: 'info',
    confirmButtonText: '확인',
  })
}
