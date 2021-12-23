import { Route } from 'react-router-dom'
import Header from '../route/Header'
import Footer from '../route/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/toy.css'

import Board from './board/Board'
import Login from './login/Login'
import Register from './register/Register'
import Product from './product/Product'
import Cart from './cart/Cart'
import History from './history/History'
import Naver from './naver/Naver'
import { useEffect, useState } from 'react'
import getCartId from './modules/getCartId'
import { useLocation } from 'react-router-dom'
import cookie from 'react-cookies'
import axios from 'axios'

function App() {
  const [userId, setUserId] = useState('ksh96@naver.com')
  const [cartId, setCartId] = useState('')

  useEffect(() => {
    const data = getCartId(userId)
    data.then((data) => setCartId(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation()

  useEffect(() => {
    if ('/register' !== location.pathname) {
      fncCheckSession()
    }
    // console.log(location.pathname)
  }, [location.pathname])

  const fncCheckSession = async () => {
    const tokenId = cookie.load('token_id')
    const tokenName = cookie.load('token_name')
    const userPwd = cookie.load('user_password')
    // console.log(tokenId, tokenName, userPwd)
    if (tokenName && tokenId) {
      axios
        .post('api/user?type=sessionCheck', {
          token_id: tokenId,
          token_name: tokenName,
        })
        .then((response) => {
          // console.log(response.data)
          // 유저 아이디 세팅
          setUserId(response.data.decrypt_id.user_email)
          // 쿠키의 password 검증
          if (userPwd) {
            axios
              .post('/api/user?type=sessionSignin', {
                user_email: response.data.decrypt_id.user_email,
                user_password: userPwd,
              })
              .then((response) => {
                if (!response.data[0].user_email) {
                  // 로그인 상태 해제처리
                  fncNotLogin()
                }
              })
              .catch((error) => console.log(error))
          } else {
            // 로그인 상태 해제처리
            fncNotLogin()
          }
        })
    } else {
      // 로그인 상태 해제처리
      fncNotLogin()
    }
  }

  // 검증실패 or token 정보 없을 경우 로그인 상태 해제 처리
  const fncNotLogin = () => {
    if (window.location.hash !== 'nocookie') {
      fncRemoveCookie()
    }
    window.location.href = '/login/#nocookie'
  }

  const fncRemoveCookie = () => {
    cookie.remove('token_id', { path: '/' }) // 전체에서 삭제 (path '/')
    cookie.remove('token_name', { path: '/' })
    cookie.remove('user_password', { path: '/' })
  }

  return (
    <div className='App'>
      <Header />
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/naverApi' component={Naver} />
      <Route exact path='/board' component={Board} />
      <Route
        path='/product'
        render={() => <Product userId={userId} cartId={cartId} />}
      />
      <Route
        path='/cart'
        render={() => <Cart userId={userId} cartId={cartId} />}
      />
      <Route
        path='/history'
        render={() => <History userId={userId} cartId={cartId} />}
      />
      <Footer />
    </div>
  )
}

export default App
