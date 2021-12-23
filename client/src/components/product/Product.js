import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import ProductList from './ProductList'
import ProductSearchBar from './ProductSearchBar'

const Product = ({ userId, cartId }) => {
  const [zzimList, setZzimList] = useState([])

  const selectedProductList = (
    category1 = '',
    category2 = '',
    category3 = '',
    category4 = ''
  ) => {
    axios
      .post('api/product?type=list', {
        user_id: userId,
        category1,
        category2,
        category3,
        category4,
        title: '',
      })
      .then((response) => {
        let data = response.data.json
        setZzimList(data)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    selectedProductList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container>
      <h2>찜 목록</h2>
      <ProductSearchBar selectedProductList={selectedProductList} />
      <ProductList
        zzimList={zzimList}
        selectedProductList={selectedProductList}
        userId={userId}
        cartId={cartId}
      />
    </Container>
  )
}

export default Product
