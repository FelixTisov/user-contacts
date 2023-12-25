import React, { useState } from 'react'
import ContactItem from '../contact_item/contactItem'
import './contactsList.scss'

const ContactList = ({ contactsList, chooseContact, createNewHandler }) => {
  const [searchValue, setSearchValue] = useState('')

  // Изменить значение поля поиска
  const searchInputHandler = (event) => {
    setSearchValue(event.target.value)
  }

  // Открыть контакт
  const chooseThis = (contact) => {
    chooseContact(contact)
  }

  return (
    <div className="list">
      <div className="list_action">
        <button className="add-button" onClick={() => createNewHandler()}>
          Добавить
        </button>
      </div>
      <div className="list_search-container">
        <input
          className="search-input"
          value={searchValue}
          type="text"
          placeholder="Поиск"
          onChange={searchInputHandler}
        ></input>
      </div>
      <div className="list_contacts">
        {searchValue.length > 0
          ? contactsList?.map((contact, index) => {
              if (
                contact.ContactName.toLowerCase().indexOf(
                  searchValue.toLowerCase()
                ) !== -1
              ) {
                return (
                  <div key={index} onClick={() => chooseThis(contact)}>
                    <ContactItem name={contact.ContactName} />
                  </div>
                )
              }
              return null
            })
          : contactsList?.map((contact, index) => (
              <div key={index} onClick={() => chooseThis(contact)}>
                <ContactItem name={contact.ContactName} />
              </div>
            ))}
      </div>
    </div>
  )
}
export default ContactList
