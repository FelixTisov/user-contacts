import React, { useState } from 'react'
import TextInput from '../text_input/textInput'
import './contact.scss'

function Contact({ contact }) {
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const OpenFolder = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const EditContact = () => {
    setEdit(true)
  }

  const SaveContact = () => {
    setEdit(false)
  }

  return (
    <div className="container">
      <div className="container_header">
        <span className="contact-name">{contact.ContactName}</span>
        {!edit ? (
          <div className="container_btn">
            <img
              src={require('../../icons/editcontact.svg')}
              alt="Edit contact"
              class="header-button"
              onClick={EditContact}
            />

            <img
              src={require('../../icons/deletecontact.svg')}
              alt="Delete contact"
              class="header-button"
            />
          </div>
        ) : (
          <button className="container_header_btn" onClick={SaveContact}>
            Сохранить
          </button>
        )}
      </div>
      <div className="container_body">
        <TextInput
          label="Номер телефона"
          value={contact.ContactPhone}
          placeholder="Введите номер телефона"
        />
        <TextInput
          label="Электронная почта"
          value={contact.ContactEmail}
          placeholder="Введите номер телефона"
        />
        {edit ? (
          <div>
            <button className="menu" onClick={OpenFolder}>
              Добавить
            </button>
            <div className={`${!isOpen ? 'active' : 'inactive'}`}>
              <span>Телефон</span>
              <span>Почта</span>
              <span>Дата рождения</span>
              <span>Адрес</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Contact
