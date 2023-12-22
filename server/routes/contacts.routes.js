/* API для работы с данными контактов */
const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const short = require('short-uuid')

const db = require('../database')

/* '/contacts/create' - создать новый контакт */
router.post('/create', async (request, response) => {
  try {
    const {
      UserID,
      ContactName,
      ContcatPhone,
      ContactEmail,
      ContcatAdditionalData,
    } = request.body

    let ContactID = short.generate()

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO contacts (ContactID, UserID, ContactName, ContcatPhone, ContactEmail, ContcatAdditionalData) VALUES ('" +
          ContactID +
          "', '" +
          UserID +
          "', '" +
          ContactName +
          "', '" +
          ContcatPhone +
          "', '" +
          ContactEmail +
          "', '" +
          ContcatAdditionalData +
          "')",
        function (error, results, fields) {
          if (error) {
            reject(error)
          } else resolve(results)
        }
      )
    })

    await executeQuery

    response.status(201).json({ message: 'Contact created' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

/* '/contacts/get' - получить контакты пользователя */
router.post('/get', async (request, response) => {
  try {
    const { UserID } = request.body

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        'SELECT ContactID, ContactName, ContactPhone, ContactEmail, ContactAdditionalData FROM contacts WHERE UserID = ' +
          '"' +
          UserID +
          '"',
        function (error, results, fields) {
          if (error) {
            reject(error)
          } else resolve(results)
        }
      )
    })

    const results = await executeQuery

    response.status(200).json({ results })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

module.exports = router
