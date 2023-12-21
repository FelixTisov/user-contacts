import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './signup.scss'

function SignUp() {
  const navigate = useNavigate()
  const [isCreated, setCreated] = useState(false)

  // Пользовательская форма
  const [form, setForm] = useState({
    login: '',
    userPassword: '',
    userName: '',
  })

  // Регистрация пользователя
  async function trySignUp(event) {
    event.preventDefault()

    try {
      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/user/signup`,
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
          if (response.status === 201) {
            response.json().then(() => {
              setCreated(true)
              return
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

  // Обработчик изменения формы
  const inputHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // Обработчик нажатия на кнопку регистрации
  const logInHandler = () => {
    navigate('/')
  }

  return (
    <div class="wrapper">
      <div class="signup-cont">
        {isCreated ? (
          <div className="success-message-container">
            <div className="message">Пользователь успешно создан!</div>
            <div className="navigate-button-container">
              <a class="signup-btn" onClick={logInHandler}>
                Войти
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div class="title">
              <p>Регистрация</p>
            </div>

            <form onSubmit={trySignUp}>
              <input
                required
                type="text"
                name="userName"
                placeholder="Имя"
                onChange={inputHandler}
              />
              <input
                required
                type="email"
                name="login"
                placeholder="Почта"
                onChange={inputHandler}
              />
              <input
                required
                type="text"
                name="userPassword"
                placeholder="Пароль"
                onChange={inputHandler}
              />

              <button class="login-btn">ПОДТВЕРДИТЬ</button>
            </form>

            <div class="options">
              <p>Уже есть аккаунт?</p>
              <a class="signup-btn" onClick={logInHandler}>
                Войти
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUp
