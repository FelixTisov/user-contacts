import React, { useEffect, useState, useRef } from 'react'
import ContactList from '../../components/contacts_list/contactsList'
import Contact from '../../components/contact/contact'
import './home.scss'

function Home() {
  // Пустой контакт-шаблон
  const emptyContact = {
    UserID: localStorage.getItem('userID'),
    ContactName: '',
    ContactPhone: '',
    ContactEmail: '',
    ContactAdditionalData: [
      {
        pluginID: '',
        fieldTitle: '',
        fieldContent: '',
      },
    ],
  }

  const [contactsList, setContactsList] = useState(null)
  const [currentContact, setCurrentContact] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const fileInput = useRef()

  // Загрузить контакты при загрузке страницы
  useEffect(() => {
    getUserContacts()
  }, [])

  // Получение контактов пользователя
  function getUserContacts() {
    try {
      const token = localStorage.getItem('authToken')
      const UserID = localStorage.getItem('userID')

      const requestHeaders = new Headers()
      requestHeaders.set('Content-Type', 'application/json')
      requestHeaders.set('Access-Control-Allow-Origin', '*')
      requestHeaders.set('Authorization', token)

      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/contacts/get`,
        {
          method: 'POST',
          body: JSON.stringify({ UserID: UserID }),
          headers: requestHeaders,
        }
      )

      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.results != null) {
                const fetchedContacts = data.results

                // Форматируем строковые значения в массивы, у тех полей, где это необходимо
                if (fetchedContacts.length > 0)
                  fetchedContacts.forEach((element) => {
                    element.ContactPhone =
                      element.ContactPhone.toString().split(',')
                    element.ContactEmail =
                      element.ContactEmail.toString().split(',')
                    element.ContactAdditionalData = JSON.parse(
                      JSON.stringify(eval(element.ContactAdditionalData))
                    )
                  })

                setContactsList(fetchedContacts)
              }
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  // Обработчик нажатия на кнопку "Удалить"
  const deleteHandler = (ContactID) => {
    deleteContact({ ContactID: ContactID })
  }

  // Создать новый контакт
  const deleteContact = async (contact) => {
    try {
      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/contacts/delete`,
        {
          method: 'POST',
          body: JSON.stringify({ ...contact }),
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
              setCurrentContact(null)
              getUserContacts()
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

  // Получить данные формы нового контакта
  const getContactData = (data) => {
    let dataToSave = { ...data }

    dataToSave.ContactPhone = dataToSave.ContactPhone.toString()
    dataToSave.ContactEmail = dataToSave.ContactEmail.toString()
    dataToSave.ContactAdditionalData = JSON.stringify(
      dataToSave.ContactAdditionalData
    )

    isNew ? saveNewContact(dataToSave) : saveEditedContact(dataToSave)
  }

  // Создать новый контакт
  const saveNewContact = async (contact) => {
    try {
      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/contacts/create`,
        {
          method: 'POST',
          body: JSON.stringify({ ...contact }),
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
              setCurrentContact(null)
              setIsNew(false)
              getUserContacts()
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

  // Изменить существующий контакт
  const saveEditedContact = async (contact) => {
    try {
      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/contacts/edit`,
        {
          method: 'POST',
          body: JSON.stringify({ ...contact }),
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
              getUserContacts()
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

  // Выбор контакта для отображения
  const chooseContact = (contact) => {
    setCurrentContact(contact)
  }

  // Нажатие на кнопку "Добавить"
  const createNewHandler = () => {
    setIsNew(true)
  }

  // Обработчик кнопки "Импорт"
  const fileInputHandler = (e) => {
    const file = e.target.files[0]

    if (!file) {
      console.error('File not chosen')
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const content = event.target.result
      importNewContacts(content)
    }
    reader.onerror = (error) => {
      console.error('File reading error: ', error)
    }
    reader.readAsText(file)
  }

  // Импортировать контакты из загруженного файла
  function importNewContacts(data) {
    try {
      const token = localStorage.getItem('authToken')
      const UserID = localStorage.getItem('UserID')

      const requestHeaders = new Headers()
      requestHeaders.set('Content-Type', 'application/json')
      requestHeaders.set('Access-Control-Allow-Origin', '*')
      requestHeaders.set('Authorization', token)

      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/contacts/import`,
        {
          method: 'POST',
          body: data,
          headers: requestHeaders,
        }
      )

      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            response.json().then(() => {
              getUserContacts()
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

  // Обработчик кнопки "Экспорт"
  const exportHandler = () => {
    downloadUserContacts()
  }

  // Скачать контакты пользователя
  function downloadUserContacts() {
    try {
      const token = localStorage.getItem('authToken')
      const UserID = localStorage.getItem('userID')

      const requestHeaders = new Headers()
      requestHeaders.set('Content-Type', 'application/json')
      requestHeaders.set('Access-Control-Allow-Origin', '*')
      requestHeaders.set('Authorization', token)

      const request = new Request(
        `${process.env.REACT_APP_SERVER_API_URL}/contacts/get`,
        {
          method: 'POST',
          body: JSON.stringify({ UserID: UserID }),
          headers: requestHeaders,
        }
      )

      fetch(request)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          const jsonData = JSON.stringify(data.results)
          const blob = new Blob([jsonData], { type: 'application/json' })

          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'contacts.json'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="main-container">
      <div className="main-container_list">
        <ContactList
          contactsList={contactsList}
          chooseContact={chooseContact}
          createNewHandler={createNewHandler}
        />
      </div>
      <div className="right-container">
        <div className="header">
          <input
            id="contactsFileInput"
            type="file"
            ref={fileInput}
            onChange={fileInputHandler}
          />
          <label for="contactsFileInput" className="import-export-button">
            Импорт
          </label>
          <button onClick={exportHandler} className="import-export-button">
            Экспорт
          </button>
          <img
            src={require('../../icons/userpic.svg')}
            alt="User profile photo"
            className="user-photo"
          />
        </div>
        <div className="contact-container">
          {isNew ? (
            <div className="new-contact">
              <Contact
                contact={emptyContact}
                getContactData={getContactData}
                isNew={true}
              />
            </div>
          ) : (
            <div className="current-contact">
              {currentContact === null ? (
                <></>
              ) : (
                <Contact
                  contact={currentContact}
                  getContactData={getContactData}
                  isNew={false}
                  deleteHandler={deleteHandler}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
