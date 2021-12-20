import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default function BoardPagination({ selectBoardPage, setPLusIndex }) {
  const [pagePoint, setPagePoint] = useState(0)

  const clickNext = () => {
    setPagePoint((cur) => cur + 5)
  }
  const clickPrevious = () => {
    if (pagePoint === 0) return
    else {
      setPagePoint((cur) => cur - 5)
    }
  }

  useEffect(() => {
    selectBoardPage(pagePoint + 1)
    setPLusIndex(pagePoint + 1)
  }, [pagePoint])

  return (
    <Pagination style={{ margin: `0 auto`, width: 190 }}>
      {/* <PaginationItem>
        <PaginationLink first />
      </PaginationItem> */}
      <PaginationItem>
        <PaginationLink previous onClick={clickPrevious} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() => {
            selectBoardPage(pagePoint + 1)
            setPLusIndex(pagePoint + 1)
          }}
          value={pagePoint + 1}
        >
          {pagePoint + 1}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() => {
            selectBoardPage(pagePoint + 2)
            setPLusIndex(pagePoint + 2)
          }}
          value={pagePoint + 2}
        >
          {pagePoint + 2}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() => {
            selectBoardPage(pagePoint + 3)
            setPLusIndex(pagePoint + 3)
          }}
          value={pagePoint + 3}
        >
          {pagePoint + 3}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() => {
            selectBoardPage(pagePoint + 4)
            setPLusIndex(pagePoint + 4)
          }}
          value={pagePoint + 4}
        >
          {pagePoint + 4}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() => {
            selectBoardPage(pagePoint + 5)
            setPLusIndex(pagePoint + 5)
          }}
          value={pagePoint + 5}
        >
          {pagePoint + 5}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next onClick={clickNext} />
      </PaginationItem>
      {/* <PaginationItem>
        <PaginationLink last />
      </PaginationItem> */}
    </Pagination>
  )
}
