import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BoardList from './BoardList'
import { Button, Container } from 'reactstrap'
import SearchBar from './SearchBar'
import InsertBoard from './InsertBoard'
import BoardPagination from './BoardPagination'

const Board = () => {
  const [allBoardList, setAllBoardList] = useState([])
  const [boardList, setBoardList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [plusIndex, setPLusIndex] = useState(1)

  const selectAllBoardList = () => {
    axios
      .post('api/Board?type=list')
      .then((response) => {
        const { data } = response
        setAllBoardList(data.json)
      })
      .catch((error) =>
        console.log('selectAllBoardList error: ', error.message)
      )
  }

  const selectBoardPage = (startValue) => {
    axios
      .post('api/Board?type=page', {
        length: 10,
        start: startValue === 1 ? 0 : 1 + (startValue - 1) * 10,
      })
      .then((res) => {
        const { data } = res
        setBoardList(data.json)
      })
      .catch((error) => console.log('selectBoardPage error: ', error.message))
  }

  // 최초 로드시 10게시판씩 로드
  useEffect(() => {
    selectBoardPage(1)
  }, [allBoardList])

  // useEffect(() => {
  //   console.log('boardList', boardList)
  // }, [boardList])

  return (
    <Container>
      <SearchBar setBoardList={setBoardList} />
      <BoardList
        boardList={boardList}
        selectAllBoardList={selectAllBoardList}
        plusIndex={plusIndex}
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
      <BoardPagination
        selectBoardPage={selectBoardPage}
        setPLusIndex={setPLusIndex}
      />
    </Container>
  )
}

export default Board
