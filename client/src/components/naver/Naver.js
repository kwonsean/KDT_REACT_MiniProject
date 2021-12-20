import React, { useState } from 'react'
import { Container } from 'reactstrap'
import SearchBar from './SearchBar'
import ShoppingList from './ShoppingList'

const Naver = (props) => {
  const [searchList, setSearchList] = useState([])
  const [selectedText, setSelectedText] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  return (
    <Container>
      <h2>상품 검색 & 찜하기</h2>
      <SearchBar
        setSearchList={setSearchList}
        searchList={searchList}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
        setTotalResults={setTotalResults}
      />
      <ShoppingList
        setSearchList={setSearchList}
        searchList={searchList}
        selectedText={selectedText}
        totalResults={totalResults}
      />
    </Container>
  )
}

export default Naver
