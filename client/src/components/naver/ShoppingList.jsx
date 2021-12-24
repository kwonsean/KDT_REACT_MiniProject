import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import styled from './ShoppingList.module.css'
import axios from 'axios'
import PaginationComponent from './PaginationComponent'
import Swal from 'sweetalert2'

export default function ShoppingList({
  setSearchList,
  searchList,
  selectedText,
  totalResults,
}) {
  // 구매 버튼 클릭시 그 상품에 대한 정보 객체 매개변수로 받음
  const clickBuyBtn = (item) => {
    const {
      brand,
      category1,
      category2,
      category3,
      category4,
      hprice: h_price,
      image,
      link,
      lprice: l_price,
      maker,
      mallName,
      productId: product_id,
      productType: product_type,
      title,
    } = item
    // console.log(item)
    // TODO 찜목록에 이미 있다면? 버튼 비활성화 or 취소 => 근데 찜목록에 중복으로 들어가진 않아서 굳이 필요하진 않은 기능이라고 판단.
    Swal.fire({
      title: '상품을 찜 하시겠습니까?',
      text: `상품 가격은 ${l_price.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}원 입니다.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '찜하기',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`api/naverApi?type=save`, {
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
            mall_name: mallName,
            product_id,
            product_type,
            title,
            product_count: 0,
          })
          .then((response) => {
            // console.log(response)
            Swal.fire({
              title: `${title}을 찜 하였습니다.`,
              imageUrl: `${image}`,
              imageWidth: 400,
              imageHeight: 400,
              imageAlt: '상품 이미지',
              confirmButtonText: '확인',
            })
          })
          .catch((error) => {
            console.log(error)
            alert('오류가 발생하였습니다.')
          })
      }
    })
  }

  return (
    <div>
      {searchList.length > 0 && (
        <Row className={styled.rowTitle}>
          <Col xl='1'>상품이미지</Col>
          <Col xs='6'>상품 명</Col>
          <Col xs='2'>최저가</Col>
          <Col xs='2'>판매처</Col>
          <Col xs='1'>찜하기</Col>
        </Row>
      )}

      {searchList.length > 0 &&
        searchList.map((item) => {
          const htmlTitle = item.title
          return (
            <Row className={styled.row} key={item.productId}>
              <Col xs='1'>
                <img alt='item' src={item.image} width='100%' />
              </Col>
              <Col xs='6'>
                <h5
                  dangerouslySetInnerHTML={{ __html: htmlTitle }}
                  className={styled.title}
                ></h5>
              </Col>
              <Col xs='2'>
                <span>
                  {item.lprice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </span>
              </Col>
              <Col xs='2'>
                <span>{item.mallName}</span>
              </Col>
              <Col xs='1'>
                <Button onClick={() => clickBuyBtn(item)}>찜하기</Button>
              </Col>
            </Row>
          )
        })}
      {searchList.length > 0 && (
        <PaginationComponent
          selectedText={selectedText}
          setSearchList={setSearchList}
          totalResults={totalResults}
        />
      )}
    </div>
  )
}
