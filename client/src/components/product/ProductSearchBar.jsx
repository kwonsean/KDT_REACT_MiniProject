import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'

export default function ProductSearchBar({ selectedProductList }) {
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [category3, setCategory3] = useState('')
  const [category4, setCategory4] = useState('')
  const [category1List, setCategory1List] = useState([])
  const [category2List, setCategory2List] = useState([])
  const [category3List, setCategory3List] = useState([])
  const [category4List, setCategory4List] = useState([])

  const selectCategory = (e) => {
    const name = e.target.name
    if (name === 'selectCategory1') {
      setCategory1(e.target.value)
      setCategory2List([])
      setCategory2('')
      setCategory3List([])
      setCategory3('')
      setCategory4List([])
      setCategory4('')
    } else if (name === 'selectCategory2') {
      setCategory2(e.target.value)
      setCategory3List([])
      setCategory3('')
      setCategory4List([])
      setCategory4('')
    } else if (name === 'selectCategory3') {
      setCategory3(e.target.value)
      setCategory4List([])
      setCategory4('')
    } else if (name === 'selectCategory4') {
      setCategory4(e.target.value)
    }
  }

  const clickSearchBtn = () => {
    selectedProductList(category1, category2, category3, category4)
    // console.log('search!', category1, category2, category3, category4)
  }

  useEffect(() => {
    axios
      .post('api/product?type=category', {
        num: 1,
      })
      .then((response) => {
        // console.log(response)
        let data = response.data.json
        data = data.map((item) => item.category1)
        // console.log(data)
        setCategory1List(data)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .post('api/product?type=category', {
        num: 2,
        category1,
      })
      .then((response) => {
        let data = response.data.json
        data = data.map((item) => item.category2)
        setCategory2List(data)
      })
      .catch((error) => console.log(error))
  }, [category1])

  useEffect(() => {
    axios
      .post('api/product?type=category', {
        num: 3,
        category1,
        category2,
      })
      .then((response) => {
        let data = response.data.json
        data = data.map((item) => item.category3)
        setCategory3List(data)
      })
      .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category2])

  useEffect(() => {
    axios
      .post('api/product?type=category', {
        num: 4,
        category1,
        category2,
        category3,
      })
      .then((response) => {
        let data = response.data.json
        data = data.map((item) => item.category4)
        setCategory4List(data)
      })
      .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category3])

  return (
    <Row style={{ marginBottom: 20 }}>
      <Col xs='1'></Col>
      <Col xs='2'>
        <Input name='selectCategory1' type='select' onChange={selectCategory}>
          <option value=''>분류 1</option>
          {category1List.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Input>
      </Col>
      <Col xs='2'>
        <Input name='selectCategory2' type='select' onChange={selectCategory}>
          <option value=''>분류 2</option>
          {category2List.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Input>
      </Col>
      <Col xs='2'>
        <Input name='selectCategory3' type='select' onChange={selectCategory}>
          <option value=''>분류 3</option>
          {category3List.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Input>
      </Col>
      <Col xs='2'>
        <Input name='selectCategory4' type='select' onChange={selectCategory}>
          <option value='alert'>분류 4</option>
          {category4List.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Input>
      </Col>

      <Col xs='2'>
        <Button onClick={clickSearchBtn}>검색</Button>
      </Col>
      <Col xs='1'></Col>
    </Row>
  )
}
