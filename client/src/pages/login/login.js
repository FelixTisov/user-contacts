import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './login.scss'

function Login() {
  const navigate = useNavigate()

  // Пользовательская форма
  const [form, setForm] = useState({
    login: '',
    userPassword: '',
  })

  // Авторизация пользователя
  async function tryLogin(event) {
    event.preventDefault()

    try {
      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/user/login`,
        {
          method: 'POST',
          body: JSON.stringify({ ...form }),
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )

      fetch(request)
        .then((response) => {
          if (response.status === 303) {
            response.json().then((data) => {
              const userID = data.userid
              const authToken = data.token

              localStorage.setItem('userID', userID)
              localStorage.setItem('authToken', authToken)

              return navigate('/home')
            })
          } else {
            throw new Error('Server error!')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  // Обработчик нажатия на кнопку регистрации
  const signUpHandler = () => {
    navigate('/signup')
  }

  /* Обработчик изменения формы */
  const inputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="wrapper">
      <div className="login-cont">
        <div className="title">
          <p>Вход</p>
        </div>

        <form onSubmit={tryLogin}>
          <input
            type="email"
            name="login"
            placeholder="Почта"
            onChange={inputHandler}
          />
          <input
            type="text"
            name="userPassword"
            placeholder="Пароль"
            onChange={inputHandler}
          />

          <button className="login-btn">ВОЙТИ</button>
        </form>

        <div className="options">
          <p>Нет аккаунта?</p>
          <a className="signup-btn" onClick={signUpHandler}>
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
