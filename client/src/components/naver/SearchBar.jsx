import React, { useEffect, useState } from 'react'
import { Col, Input, Row, Button, ListGroup, ListGroupItem } from 'reactstrap'
import axios from 'axios'
import styles from './SearchBar.module.css'

export default function SearchBar({
  setSearchList,
  searchList,
  selectedText,
  setSelectedText,
  setTotalResults,
}) {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    // setSearchList([])
  }, [])

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (selectedText === '') return
    chose()
    setText('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedText])

  function search() {
    axios
      .post('api/naverApi?type=search', {
        query: text,
      })
      .then((response) => {
        let data = response.data.items.flat()
        data = data.map((item) => item[0])
        // console.log('변경', data)
        setData(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function chose() {
    axios
      .post('api/naverApi?type=shopList', {
        query: selectedText,
      })
      .then((response) => {
        const { items, total } = response.data
        // console.log(items)
        // console.log(total)
        setSearchList(items)
        setIsSearched(true)
        setTotalResults(total)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClick = (e) => {
    setSelectedText(e.target.innerText)
  }
  const btnClick = () => {
    setSelectedText(text)
  }

  return (
    <>
      <Row>
        <Col xs='3'></Col>
        <Col xs='6'>
          <Input
            value={text}
            onChange={handleChange}
            placeholder='구매하실 상품을 검색해보세요!'
          />
          <ListGroup>
            {data.map((item, index) => {
              return (
                <ListGroupItem
                  action
                  tag='button'
                  onClick={handleClick}
                  className={styles.list}
                  key={index}
                  style={{ listStyle: 'none' }}
                >
                  {item}
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </Col>
        <Col xs='1'>
          <Button onClick={btnClick}>검색</Button>
        </Col>
        <Col xs='2'></Col>
      </Row>
      {!isSearched ? null : searchList.length === 0 ? (
        <div className={styles.result}>
          <strong>{selectedText}</strong>에 대한 상품 검색 결과가 없습니다.
        </div>
      ) : (
        <div className={styles.result}>
          <strong>{selectedText}</strong>에 대한 상품 검색 결과입니다.
        </div>
      )}
    </>
  )
}
