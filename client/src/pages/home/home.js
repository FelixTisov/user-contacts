import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ContactList from '../../components/contacts_list/contactsList'
import Contact from '../../components/contact/contact'
import './home.scss'

function Home() {
  const [contactsList, setContactsList] = useState([
    {
      UserName: '',
      ContactPhone: '',
      ContactEmail: '',
    },
  ])
  const [currentContact, setCurrentContact] = useState(contactsList[0])

  // Получение контактов пользователя после логина
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
                setCurrentContact(fetchedContacts[0])
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

  useEffect(() => {
    getUserContacts()
  }, [])

  const chooseContact = (contact) => {
    setCurrentContact(contact)
  }

  return (
    <div className="main-container">
      <div className="main-container_list">
        <ContactList
          contactsList={contactsList}
          chooseContact={chooseContact}
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
          <Contact contact={currentContact} />
        </div>
      </div>
    </div>
  )
}

export default Home
