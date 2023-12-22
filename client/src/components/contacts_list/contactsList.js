import React, { useState } from 'react'
import SearchInput from '../search_input/searchInput'
import ContactItem from '../contact_item/contactItem'
import './contactsList.scss'

const ContactList = ({ contactsList, chooseContact }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [value, setValue] = useState('')

  const changeSearch = (e) => {
    setValue(e.target.value)
  }

  const OpenFolder = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const chooseThis = (contact) => {
    chooseContact(contact)
  }

  return (
    <div className="list">
      <div className="list_action">
        <button className="add-button">Добавить</button>
        {/* <div className="list_action_menu_container">
          <button className="list_action_menu" onClick={OpenFolder}>
            Фильтр
          </button>
          <div className={`${!isOpen ? 'active' : 'inactive'}`}>
            <span>По имени</span>
            <span>По чему</span>
          </div>
        </div> */}
      </div>
      <div className="list_search-container">
        <SearchInput
          label="Поиск"
          placeholder="Поиск"
          onChange={changeSearch}
        />
      </div>
      <div className="list_contacts">
        {contactsList.map((contact, index) => (
          <div key={index} onClick={() => chooseThis(contact)}>
            <ContactItem name={contact.ContactName} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ContactList
