import React from 'react'
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'

export default function DetailBoard({ showDetail, setShowDetail, data }) {
  return (
    <Modal isOpen={showDetail}>
      <ModalHeader>
        <b>{data.title}</b>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs='2'>
            <span>작성자</span>
          </Col>
          <Col xs='3'>
            <span type='text'>{data.insert_user}</span>
          </Col>
          <Col xs='3'></Col>
          <Col xs='2'>
            <span>조회수</span>
          </Col>
          <Col xs='2'>
            <span type='text'>{data.view_count}</span>
          </Col>
        </Row>

        <Row>
          <Label htmlFor='content'>
            내용
            <Input
              id='content'
              type='textarea'
              value={data.content}
              readOnly
              style={{ minHeight: 300 }}
            />
          </Label>
        </Row>
      </ModalBody>
      <ModalFooter style={{ justifyContent: 'flex-start' }}>
        <span>작성일자</span>

        <span type='text'>{data.insert_date}</span>
        <Button
          style={{ position: 'absolute', bottom: 5, right: 5 }}
          onClick={() => setShowDetail(false)}
        >
          닫기
        </Button>
      </ModalFooter>
    </Modal>
  )
}
