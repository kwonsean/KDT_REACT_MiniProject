import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function SearchBar({ setBoardList }) {
  const [searchType, setSearchType] = useState('')
  const [searchText, setSearchText] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const searchBoardList = (title, content) => {
    axios
      .post('api/Board?type=list', {
        title,
        content,
      })
      .then((response) => {
        const { data } = response
        setBoardList(data.json)
      })
      .catch((error) => console.log('selectBoardList error: ', error.message))
  }

  const changeSelect = (e) => {
    setSearchType(e.target.value)
  }

  useEffect(() => {
    if (searchType === 'content') {
      setContent(searchText)
      setTitle('')
    } else if (searchType === 'title') {
      setTitle(searchText)
      setContent('')
    } else {
      setContent('')
      setTitle('')
    }
  }, [searchType, searchText])

  const changeSearch = (e) => {
    setSearchText(e.target.value)
  }

  const clickSearchBtn = () => {
    if (searchType === 'alert' && searchText !== '') {
      optionAlert()
      return
    }
    searchBoardList(title, content)
  }

  return (
    <Row style={{ marginBottom: 20 }}>
      <Col xs='1'></Col>
      <Col xs='2'>
        <Input name='select' type='select' onChange={changeSelect}>
          <option value='alert'>검색옵션 선택</option>
          <option value='content'>내용으로 검색</option>
          <option value='title'>제목으로 검색</option>
        </Input>
      </Col>
      <Col xs='7'>
        <Input onChange={changeSearch} value={searchText} />
      </Col>
      <Col xs='2'>
        <Button onClick={clickSearchBtn}>검색</Button>
      </Col>
      <Col xs='1'></Col>
    </Row>
  )
}

const optionAlert = () => {
  Swal.fire({
    position: 'top',
    icon: 'info',
    title: '검색 옵션을 선택하세요!',
    showConfirmButton: false,
    timer: 1200,
  })
}
