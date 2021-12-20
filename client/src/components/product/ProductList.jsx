import axios from 'axios'
import React from 'react'
import { useState } from 'react/cjs/react.development'
import { Button, Col, Input, Row } from 'reactstrap'
import styled from '../naver/ShoppingList.module.css'
import Swal from 'sweetalert2'

export default function ProductList({ zzimList, selectedProductList }) {
  console.log('zzim!', zzimList)
  const buyCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [addCount, setAddCount] = useState(0)
  const [selectedItem, setSelectedItem] = useState({})

  const selectBuyCount = (e, item) => {
    setSelectedItem(item)
    setAddCount(e.target.value)
  }

  const clickSaveItemBtn = () => {
    const {
      brand,
      category1,
      category2,
      category3,
      category4,
      h_price,
      image,
      link,
      l_price,
      maker,
      mall_name,
      product_id,
      product_type,
      product_count,
      title,
    } = selectedItem

    axios
      .post(`api/product?type=modify`, {
        brand,
        category1,
        category2,
        category3,
        category4,
        h_price,
        image,
        l_price,
        link,
        maker,
        mall_name,
        product_id,
        product_type,
        title,
        product_count: Number(product_count) + Number(addCount),
      })
      .then((response) => {
        // TODO 카트에 담을 수 있도록 지정
        // console.log(response)
        // Swal.fire({
        //   title: `상품을 장바구니에 담았습니다.`,
        //   text: `상품을 찜 목록에서 삭제하였습니다.`,
        //   icon: 'success',
        //   confirmButtonText: '확인',
        // })
      })
      .catch((error) => {
        console.log(error)
        alert('오류가 발생하였습니다.')
      })
  }

  const clickDeleteItemBtn = (item) => {
    Swal.fire({
      title: '상품을 삭제하시겠습니까?',
      text: `찜 목록에서 상품을 삭제합니다.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('api/product?type=delete', {
            product_id: item.product_id,
          })
          .then((response) => {
            console.log(response)
            Swal.fire({
              title: `삭제하였습니다.`,
              text: `상품을 찜 목록에서 삭제하였습니다.`,
              icon: 'success',
              confirmButtonText: '확인',
            })
            selectedProductList()
          })
          .catch((error) => {
            console.log(error)
            alert('오류가 발생하였습니다.')
          })
      }
    })
  }

  return (
    <>
      {zzimList.length > 0 && (
        <Row className={styled.rowTitle}>
          <Col xl='1'>상품이미지</Col>
          <Col xs='6'>상품 명</Col>
          <Col xs='2'>가격</Col>
          <Col xs='1'>수량</Col>
          <Col xs='1'>장바구니</Col>
          <Col xs='1'>찜</Col>
        </Row>
      )}
      {zzimList.length > 0 &&
        zzimList.map((item) => {
          const htmlTitle = item.title
          return (
            <Row key={item.productId} className={styled.row}>
              <Col xs='1'>
                <img alt='item' src={item.image} width='100%' />
              </Col>
              <Col xs='6'>
                <h5
                  className={styled.title}
                  dangerouslySetInnerHTML={{ __html: htmlTitle }}
                ></h5>
              </Col>
              <Col xs='2'>
                <span>
                  {item.l_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </span>
              </Col>
              <Col xs='1'>
                <Input type='select' onChange={(e) => selectBuyCount(e, item)}>
                  {buyCount.map((count, index) => (
                    <option key={index} value={count}>
                      {count}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col xs='1'>
                <Button onClick={clickSaveItemBtn}>담기</Button>
              </Col>
              <Col xs='1'>
                <Button onClick={() => clickDeleteItemBtn(item)}>삭제</Button>
              </Col>
            </Row>
          )
        })}
    </>
  )
}
