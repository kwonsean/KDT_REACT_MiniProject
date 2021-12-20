import React, { useState } from 'react'
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import axios from 'axios'

export default function InsertBoard({
  showModal,
  setShowModal,
  selectAllBoardList,
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [pwType, setPwType] = useState('password')

  const handleOnchange = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value)
    } else if (e.target.id === 'content') {
      setContent(e.target.value)
    } else if (e.target.id === 'author') {
      setUser(e.target.value)
    } else if (e.target.id === 'password') {
      setPassword(e.target.value)
    }
  }

  const insertBoard = () => {
    axios
      .post('/api/Board?type=save', {
        title,
        content,
        insert_user: user,
        write_password: password,
        view_count: 0,
      })
      .then((response) => {
        // console.log(response)
        selectAllBoardList()
        setShowModal(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const changePwType = () => {
    if (pwType === 'password') setPwType('text')
    else setPwType('password')
  }

  return (
    <Modal isOpen={showModal} style={{ width: '800px' }}>
      <ModalHeader toggle={() => setShowModal(false)}>게시글 쓰기</ModalHeader>
      <ModalBody>
        <Row>
          <Label htmlFor='title' onChange={(e) => handleOnchange(e)}>
            제목
            <Input id='title' type='text' />
          </Label>
        </Row>
        <Row>
          <Label htmlFor='content'>
            내용
            <Input
              id='content'
              type='textarea'
              onChange={(e) => handleOnchange(e)}
            />
          </Label>
        </Row>
        <Row>
          <Label htmlFor='author'>
            작성자 명
            <Input
              id='author'
              type='text'
              onChange={(e) => handleOnchange(e)}
            />
          </Label>
        </Row>
        <Row>
          <Label htmlFor='password'>
            글 비밀번호
            <Input
              id='password'
              type={pwType}
              onFocus={changePwType}
              onBlur={changePwType}
              onChange={(e) => handleOnchange(e)}
            />
          </Label>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={insertBoard}>
          글쓰기 완료!
        </Button>
        <Button onClick={() => setShowModal(false)}>닫기</Button>
      </ModalFooter>
    </Modal>
  )
}
