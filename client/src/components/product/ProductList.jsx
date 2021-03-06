import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import styled from '../naver/ShoppingList.module.css'
import Swal from 'sweetalert2'

export default function ProductList({
  zzimList,
  selectedProductList,
  userId,
  cartId,
}) {
  // console.log('zzim!', zzimList)
  const [defaultValue, setDefaultValue] = useState(false)
  const buyCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  let selectedItems = []

  // cartId 가 장바구니 화면에서도 필요하여 app.js에서 받아와 사용하는것으로 수정

  // 수량이 변경될때마다 아이템들을 저장하는 배열 생성
  const selectBuyCount = (e, item) => {
    item = { ...item, addCount: Number(e.target.value) }
    setDefaultValue(false)
    // console.log(item)

    // id가 유일하면 true 이미 있으면 false
    const isAlreadyHave = (currentValue) =>
      currentValue.product_id !== item.product_id

    // true => 배열에 item추가, false => add_count값 업데이트
    if (selectedItems.every(isAlreadyHave)) {
      selectedItems.push(item)
    } else {
      selectedItems = selectedItems.map((selecteditem) => {
        if (selecteditem.product_id === item.product_id) {
          return item
        } else {
          return selecteditem
        }
      })
    }

    // console.log('selectedItems', selectedItems)
  }

  const clickSaveItemBtn = (item) => {
    // console.log(item)
    let selectedItem = selectedItems.filter(
      (selectedItem) => selectedItem.product_id === item.product_id
    )[0]

    // console.log('selecteITEM!', selectedItem)

    // 수량 체크 없이 그냥 담기를 눌렀을 경우 + 수량을 0으로 지정한 경우 api 수행 X
    if (selectedItem === undefined || selectedItem.addCount === 0) {
      zeroBuyCount()
      return
    }

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
      // product_count,
      title,
      addCount,
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
        // 기본값을 0이 아닌 1로 설정하는 다른 개발자가 있고 내 프로젝트에선 수량 체크 후 그 값을 장바구니에 담는 로직이므로 수정
        // product_count: product_count + addCount,
        product_count: addCount,
        title,
      })
      .then((updateProuductCountResponse) => {
        // TODO 카트에 담을 수 있도록 지정
        // console.log(updateProuductCountResponse)
        // console.log(product_id)
        axios
          .post('api/cart?type=save', {
            cart_id: cartId,
            product_id,
            user_id: userId,
            amount: addCount,
          })
          .then((cartSaveResponse) => {
            // console.log('cartSaveResponse', cartSaveResponse)
            successSaveCart(addCount)
            setDefaultValue(true)
          })
          .catch((cartSaveError) => {
            console.log(cartSaveError)
          })
      })
      .catch((updateProuductCountError) => {
        zeroBuyCount()
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
            // console.log(response)
            Swal.fire({
              title: `삭제하였습니다.`,
              text: `상품을 찜 목록에서 삭제하였습니다.`,
              icon: 'success',
              confirmButtonText: '확인',
            })
            selectedProductList()
            setDefaultValue(false)
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
        zzimList.map((item) => (
          <Row key={item.productId} className={styled.row}>
            <Col xs='1'>
              <img alt='item' src={item.image} width='100%' />
            </Col>
            <Col xs='6'>
              <h5
                className={styled.title}
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></h5>
            </Col>
            <Col xs='2'>
              <span>
                {item.l_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
              </span>
            </Col>
            <Col xs='1'>
              <Input
                type='select'
                value={defaultValue ? 0 : null}
                onChange={(e) => selectBuyCount(e, item)}
              >
                {buyCount.map((count, index) => (
                  <option key={index} value={count}>
                    {count}
                  </option>
                ))}
              </Input>
            </Col>
            <Col xs='1'>
              <Button onClick={() => clickSaveItemBtn(item)}>담기</Button>
            </Col>
            <Col xs='1'>
              <Button onClick={() => clickDeleteItemBtn(item)}>삭제</Button>
            </Col>
          </Row>
        ))}
    </>
  )
}

function zeroBuyCount() {
  Swal.fire({
    title: `수량을 선택해주세요!`,
    icon: 'warning',
    confirmButtonText: '확인',
  })
}

function successSaveCart(addCount) {
  Swal.fire({
    title: `장바구니에 담았습니다!`,
    text: `선택한 물건을 장바구니에 ${addCount}개 담았습니다.`,
    icon: 'success',
    confirmButtonText: '확인',
  })
}
