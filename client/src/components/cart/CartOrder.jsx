import React from 'react'
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'

export default function CartOrder() {
  return (
    <Card>
      <CardHeader>
        <h3>배송지</h3>
      </CardHeader>
      <CardBody>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'>
            <Label for='receive_user' style={{ fontSize: 18, margin: '4px 0' }}>
              받는 사람
            </Label>
          </Col>
          <Col xs='9'>
            <Input
              id='receive_user'
              placeholder='받는 사람 이름을 입력하세요.'
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'>
            <Label
              for='receive_user_tel1'
              style={{ fontSize: 18, margin: '4px 0' }}
            >
              전화 번호
            </Label>
          </Col>
          <Col xs='2'>
            <Input id='receive_user_tel1'></Input>
          </Col>
          <Col xs='1' style={{ textAlign: 'center' }}>
            <span>—</span>
          </Col>
          <Col xs='2'>
            <Input id='receive_user_tel2'></Input>
          </Col>
          <Col xs='1' style={{ textAlign: 'center' }}>
            <span>—</span>
          </Col>
          <Col xs='2'>
            <Input id='receive_user_tel3'></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'>
            <Label
              for='receive_address1'
              style={{ fontSize: 18, margin: '4px 0' }}
            >
              배송지 주소
            </Label>
          </Col>
          <Col xs='9'>
            <Input
              id='receive_address1'
              placeholder='시/도를 입력하세요. ex) 인천광역시'
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col xs='3'></Col>
          <Col xs='9'>
            <Input
              id='receive_address2'
              placeholder='도로명을 입력하세요. ex) 아나지로332'
            ></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col xs='3'></Col>
          <Col xs='9'>
            <Input
              id='receive_address3'
              placeholder='상세주소를 입력하세요. ex) 101동 101호'
            ></Input>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
