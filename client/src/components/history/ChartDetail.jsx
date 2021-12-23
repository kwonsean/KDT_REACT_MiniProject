import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import styled from '../naver/ShoppingList.module.css'

export default function ChartDetail({ userId, selectedCategory }) {
  const [rawDetailData, setRawDetailData] = useState([])
  const [finalDetailData, setFinalDetailData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  useEffect(() => {
    axios
      .post('api/order?type=userStatDetail', {
        user_id: userId,
        category1: selectedCategory,
      })
      .then((response) => setRawDetailData(response.data.json))
      .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  useEffect(() => {
    // console.log(rawDetailData)
    let total = 0
    rawDetailData.forEach((item) => (total += item.product_count))
    setTotalCount(total)

    let removeSameItemList = []
    let filteredDetailData = rawDetailData.map((item) => ({
      id: item.product_id,
      title: item.title,
      product_count: item.product_count,
    }))
    // console.log(filteredDetailData)

    for (let i = 0; i < filteredDetailData.length; i++) {
      for (let j = i; j < filteredDetailData.length; j++) {
        let isAlreadyThere = removeSameItemList.find(
          (item) => item.id === filteredDetailData[i].id
        )
        if (filteredDetailData[i].id === filteredDetailData[j].id && i !== j) {
          if (isAlreadyThere) {
            break
          } else {
            filteredDetailData[i].product_count +=
              filteredDetailData[j].product_count
          }
        }
        if (
          j === filteredDetailData.length - 1 &&
          isAlreadyThere === undefined
        ) {
          removeSameItemList.push(filteredDetailData[i])
        }
      }
    }
    // console.log('최종', removeSameItemList)
    setFinalDetailData(removeSameItemList)
  }, [rawDetailData])

  return (
    <div
      style={{
        minWidth: 500,
        width: 500,
        margin: '0 0 0 150px',
      }}
    >
      {finalDetailData.length > 0 ? (
        <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px' }}>
          <CardHeader>
            <h4 style={{ marginBottom: 0 }}>{selectedCategory} 카테고리</h4>
          </CardHeader>
          <CardBody style={{ maxHeight: 450, overflow: 'scroll' }}>
            <Row className={styled.rowTitle}>
              <Col xs='1'></Col>
              <Col xs='9' style={{ textAlign: 'left' }}>
                구매 상품 명
              </Col>
              <Col xs='2'>수량</Col>
            </Row>
            {finalDetailData.map((item) => (
              <Row key={item.product_id}>
                <Col xs='10'>
                  <h5
                    className={styled.title}
                    style={{ fontSize: 14 }}
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  ></h5>
                </Col>
                <Col xs='2' style={{ textAlign: 'center' }}>
                  {item.product_count}
                </Col>
              </Row>
            ))}
          </CardBody>
          <CardFooter style={{ textAlign: 'right', fontSize: 20 }}>
            <span>
              {selectedCategory} 카테고리 전체 구매 물건 수 <b>{totalCount}</b>{' '}
              개
            </span>
          </CardFooter>
        </Card>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 430,
          }}
        >
          <h2>카테고리를 선택해보세요!</h2>
        </div>
      )}
    </div>
  )
}
