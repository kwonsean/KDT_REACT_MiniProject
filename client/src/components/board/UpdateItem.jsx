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
import Swal from 'sweetalert2'

export default function UpdateItem({
  showUpdate,
  setShowUpdate,
  data,
  selectAllBoardList,
}) {
  // console.log(data)
  const [title, setTitle] = useState(data.title)
  const [content, setContent] = useState(data.content)
  const [checkPw, setCheckPw] = useState(true)

  const handleOnchange = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value)
    } else if (e.target.id === 'content') {
      setContent(e.target.value)
    }
  }

  const handleOnBlue = (e) => {
    if (e.target.value !== data.write_password) {
      wrongPwAlert()
    } else {
      setCheckPw(false)
    }
  }

  const updataBoard = () => {
    axios
      .post('/api/Board?type=save', {
        id: data.id,
        title,
        content,
        view_count: data.view_count,
        insert_user: data.insert_user,
        write_password: data.write_password,
      })
      .then((response) => {
        selectAllBoardList()
        setShowUpdate(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <Modal isOpen={showUpdate}>
      <ModalHeader toggle={() => setShowUpdate(false)}>게시글 수정</ModalHeader>
      <ModalBody>
        <Row>
          <Label htmlFor='title' onChange={(e) => handleOnchange(e)}>
            제목
            <Input id='title' type='text' value={title} />
          </Label>
        </Row>
        <Row>
          <Label htmlFor='content'>
            내용
            <Input
              id='content'
              type='textarea'
              value={content}
              onChange={(e) => handleOnchange(e)}
            />
          </Label>
        </Row>
        <Row>
          <Label htmlFor='password'>
            비밀번호 확인
            <Input
              id='password'
              type='text'
              placeholder='글 작성시 입력한 비밀번호를 입력하세요.'
              onBlur={(e) => handleOnBlue(e)}
            />
          </Label>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={updataBoard} disabled={checkPw}>
          글수정 완료!
        </Button>
        <Button onClick={() => setShowUpdate(false)}>닫기</Button>
      </ModalFooter>
    </Modal>
  )
}

const wrongPwAlert = () => {
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: '비밀번호가 틀렸습니다.',
    showConfirmButton: false,
    timer: 1200,
  })
}
