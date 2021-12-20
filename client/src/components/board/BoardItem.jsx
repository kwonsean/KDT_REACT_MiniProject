import React, { useState } from 'react'
import { Button } from 'reactstrap'
import UpdateItem from './UpdateItem'
import DetailBoard from './DetailBoard'
import axios from 'axios'

function BoardItem({ index, boardData, selectAllBoardList }) {
  // console.log('data!!!!!!!', boardData)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const upCount = () => {
    axios.post('/api/Board?type=upCount', {
      id: boardData.id,
    })
  }

  const clickItem = () => {
    upCount()
    selectAllBoardList()
    setShowDetail(true)
  }

  const clickUpdateBtn = (e) => {
    e.stopPropagation()
    setShowUpdate(true)
  }

  return (
    <tr onClick={clickItem} style={{ cursor: 'pointer' }}>
      <td>{index + 1}</td>
      <td>
        {boardData.title.length > 16
          ? `${boardData.title.substring(0, 16)} ...`
          : boardData.title}
      </td>
      <td>
        {boardData.content.length > 41
          ? `${boardData.content.substring(0, 41)} ...`
          : boardData.content}
      </td>
      <td>{boardData.insert_user}</td>
      <td>{boardData.insert_date.slice(2, 10)}</td>
      <td>{boardData.view_count}</td>
      <td>
        <Button
          onClick={clickUpdateBtn}
          style={{
            padding: '2px 6px',
          }}
        >
          수정
        </Button>
      </td>

      {showUpdate ? (
        <UpdateItem
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          selectAllBoardList={selectAllBoardList}
          data={boardData}
        />
      ) : null}
      {showDetail ? (
        <DetailBoard
          setShowDetail={setShowDetail}
          showDetail={showDetail}
          data={boardData}
        />
      ) : null}
    </tr>
  )
}

export default BoardItem
