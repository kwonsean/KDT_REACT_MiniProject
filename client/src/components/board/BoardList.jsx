import React from 'react'
import { Table } from 'reactstrap'
import BoardItem from './BoardItem'

export default function BoardList({
  boardList,
  selectAllBoardList,
  plusIndex,
}) {
  return (
    <>
      <Table dark hover size='xl' striped>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>게시글 번호</th>
            <th style={{ width: '20%' }}>제목</th>
            <th style={{ width: '25%' }}>내용</th>
            <th style={{ width: '15%' }}>작성자</th>
            <th style={{ width: '10%' }}>작성일자</th>
            <th style={{ width: '10%' }}>조회수</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((boardData, index) => (
            <BoardItem
              key={boardData.id}
              boardData={boardData}
              selectAllBoardList={selectAllBoardList}
              index={index}
              plusIndex={plusIndex}
            />
          ))}
        </tbody>
      </Table>
      {boardList.length === 0 && (
        <div
          style={{
            padding: 30,
            marginTop: -17,

            border: `1px solid gray`,

            fontSize: 30,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          검색결과가 없습니다!
        </div>
      )}
    </>
  )
}
