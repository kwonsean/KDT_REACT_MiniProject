import React, { useEffect } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const Page = ({ currentPage, pageCount, ...props }) => {
  useEffect(() => {
    console.log(currentPage)
  })

  const fncSearch = (params) => {
    props.fncSearch(params)
  }
  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first href='#' onClick={() => fncSearch(0)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          href='#'
          onClick={() =>
            0 === currentPage ? null : fncSearch(currentPage - 1)
          }
        />
      </PaginationItem>
      {[...Array(pageCount)].map((data, i) => (
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={() => fncSearch(i)} href='#'>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink
          next
          href='#'
          onClick={() =>
            pageCount - 1 === currentPage ? null : fncSearch(currentPage + 1)
          }
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          href='#'
          onClick={() => fncSearch(pageCount - 1)}
        />
      </PaginationItem>
    </Pagination>
  )
}

export default Page
