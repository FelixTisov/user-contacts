import { useNavigate } from 'react-router-dom'
import React from 'react'

// Авторизация пользователя
async function tryLogin() {
  try {
    const request = new Request(`${process.env.VUE_APP_API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify({ ...this.form }),
      headers: { 'content-type': 'application/json' },
    })

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
    console.log(error)
  }
}

function Login() {
  return <div>LogIn</div>
}

export default Login
