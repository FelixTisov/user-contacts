import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
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
    data.ContactAdditionalData = JSON.stringify(data.ContactAdditionalData)
    isNew ? saveNewContact(data) : saveEditedContact(data)
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
