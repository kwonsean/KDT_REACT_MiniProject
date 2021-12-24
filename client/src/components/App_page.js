// 수업에 사용한 파일이므로 리뷰를 안하셔도 됩니다!

import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import PageV1 from './page/PageV1'
import Page from './page/Page'
import { Col, Row } from 'reactstrap'

function App() {
  // 화면에 보여줄 데이터 수
  const page = 5
  // 전체 데이터 갯수
  const [total, setTotal] = useState(30)
  // 페이지 갯수
  const [pageCount, setPageCount] = useState(0)
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setTotal(300)
  }, [])

  useEffect(() => {
    setPageCount(Math.ceil(total / page)) //13
  }, [total])

  const fncSearch = (pararms) => {
    console.log('search 하세요 : ', pararms)
    setCurrentPage(pararms)
  }
  return (
    <div>
      <Row>
        <Col md='12' style={{ textAlign: 'center', paddingTop: '150px' }}>
          <h3>{page}</h3>
          <h5>start: {currentPage * page}</h5>
          <h5>length: {page}</h5>
        </Col>
        <Col md='12' style={{ justifyContent: 'center', paddingTop: '50px' }}>
          <Page
            currentPage={currentPage}
            pageCount={pageCount}
            fncSearch={fncSearch}
          />
        </Col>
        <Col md='12' style={{ justifyContent: 'center', paddingTop: '50px' }}>
          <PageV1
            currentPage={currentPage}
            pageCount={pageCount}
            fncSearch={fncSearch}
          />
        </Col>
      </Row>
    </div>
  )
}

export default App
