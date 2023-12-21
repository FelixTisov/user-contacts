/* API для авторизации пользователя */
const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const short = require('short-uuid')

const db = require('../database')

/* '/user/signup' - регистрация нового пользователя */
router.post('/signup', async (request, response) => {
  try {
    const { login, userPassword, userName } = request.body
    const hashedPassword = await bcrypt.hash(userPassword, 12)

    if (login === '') throw new Error('Login can not be empty')
    if (userPassword === '') throw new Error('Passwrod can not be empty')
    if (userName === '') throw new Error('UserName can not be empty')

    let UserID = short.generate()

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (UserID, Email, Password, UserName) VALUES ('" +
          UserID +
          "', '" +
          login +
          "', '" +
          hashedPassword +
          "', '" +
          userName +
          "')",
        function (error, results, fields) {
          if (error) {
            reject(error)
          } else resolve(results)
        }
      )
    })

    await executeQuery

    response.status(201).json({ message: 'User created' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

/* '/user/login' - авторизация пользователя */
router.post('/login', async (request, response) => {
  try {
    const { login, userPassword } = request.body
    let UserID, password

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        'SELECT UserID, Password FROM users WHERE Email = ' + '"' + login + '"',
        function (error, results, fields) {
          if (error) reject(error)
          else {
            resolve({
              UserID: results[0].UserID,
              password: results[0].Password,
            })
          }
        }
      )
    })

    const result = await executeQuery

    UserID = result.UserID
    password = result.password

    const isMatch = await bcrypt.compare(userPassword, password)

    if (!isMatch) {
      return response.status(400).json({ message: 'Password is incorrect' })
    }

    const token = jwt.sign({ UserId: UserID }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    response.status(303).json({ token, UserId: UserID })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

module.exports = router
