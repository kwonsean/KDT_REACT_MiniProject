import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BoardList from './BoardList'
import { Button, Container } from 'reactstrap'
import SearchBar from './SearchBar'
import InsertBoard from './InsertBoard'

const Board = () => {
  const [boardList, setBoardList] = useState([])
  const [showModal, setShowModal] = useState(false)

  const selectAllBoardList = () => {
    axios
      .post('api/Board?type=list')
      .then((response) => {
        const { data } = response
        setBoardList(data.json)
      })
      .catch((error) =>
        console.log('selectAllBoardList error: ', error.message)
      )
  }

  // 최초 로드시 전체 게시판 데이터 조회
  useEffect(() => {
    selectAllBoardList()
  }, [])

  useEffect(() => {
    console.log('boardList', boardList)
  }, [boardList])

  return (
    <Container>
      <SearchBar setBoardList={setBoardList} />
      <BoardList
        boardList={boardList}
        selectAllBoardList={selectAllBoardList}
      />
      <Button
        onClick={() => setShowModal(true)}
        style={{ float: 'right', marginRight: '20px' }}
      >
        게시글 쓰기
      </Button>
      <InsertBoard
        showModal={showModal}
        setShowModal={setShowModal}
        selectAllBoardList={selectAllBoardList}
      />
    </Container>
  )
}

export default Board
