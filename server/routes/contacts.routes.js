/* API для работы с данными контактов */
const express = require('express')
const short = require('short-uuid')

const router = express.Router()
const db = require('../database')

/* '/contacts/create' - создать новый контакт */
router.post('/create', async (request, response) => {
  try {
    const {
      UserID,
      ContactName,
      ContactPhone,
      ContactEmail,
      ContactAdditionalData,
    } = request.body

    if (UserID === '') throw new Error('UserID can not be empty')
    if (ContactName === '') throw new Error('ContactName can not be empty')

    let ContactID = short.generate()

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO contacts (ContactID, UserID, ContactName, ContactPhone, ContactEmail, ContactAdditionalData) 
        VALUES ('${ContactID}', '${UserID}', '${ContactName}', '${ContactPhone}', '${ContactEmail}', '${ContactAdditionalData}')`,
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

/* '/contacts/edit' - редактировать контакт */
router.post('/edit', async (request, response) => {
  try {
    const {
      ContactID,
      UserID,
      ContactName,
      ContactPhone,
      ContactEmail,
      ContactAdditionalData,
    } = request.body

    if (ContactID === '') throw new Error('ContactID can not be empty')
    if (ContactName === '') throw new Error('ContactName can not be empty')

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        `UPDATE contacts SET 
        ContactName = '${ContactName}', 
        ContactPhone = '${ContactPhone}', 
        ContactEmail = '${ContactEmail}', 
        ContactAdditionalData = '${ContactAdditionalData}' 
        WHERE ContactID = '${ContactID}'`,

        function (error, results, fields) {
          if (error) {
            console.log(error)
            reject(error)
          } else resolve(results)
        }
      )
    })

    await executeQuery

    response.status(201).json({ message: 'Contact edited' })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: error.message })
  }
})

/* '/contacts/delete' - удалить контакт */
router.post('/delete', async (request, response) => {
  try {
    const { ContactID } = request.body

    if (ContactID === '') throw new Error('ContactID can not be empty')

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM contacts WHERE ContactID = '${ContactID}'`,
        function (error, results, fields) {
          if (error) {
            reject(error)
          } else resolve(results)
        }
      )
    })

    await executeQuery

    response.status(201).json({ message: 'Contact deleted' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

/* '/contacts/get' - получить контакты пользователя */
router.post('/get', async (request, response) => {
  try {
    const { UserID } = request.body

    if (UserID === '' || UserID === undefined)
      throw new Error('UserID can not be empty')

    const executeQuery = new Promise((resolve, reject) => {
      db.query(
        `SELECT ContactID, UserID, ContactName, ContactPhone, ContactEmail, ContactAdditionalData FROM contacts WHERE UserID = '${UserID}'`,
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

/* '/contacts/import' - ипортировать новые контакты */
router.post('/import', async (request, response) => {
  try {
    const data = request.body

    const executeQuery = (contact) => {
      return new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO contacts (ContactID, UserID, ContactName, ContactPhone, ContactEmail, ContactAdditionalData)
        VALUES ('${contact.ContactID}', '${contact.UserID}', '${contact.ContactName}', '${contact.ContactPhone}', '${contact.ContactEmail}', '${contact.ContactAdditionalData}')`,
          function (error, results, fields) {
            if (error) {
              reject(error)
            } else resolve(results)
          }
        )
      })
    }

    data.forEach(async (contact) => {
      contact['ContactID'] = short.generate()
      await executeQuery(contact)
    })

    response.status(201).json({ message: 'Contacts imported' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

module.exports = router
