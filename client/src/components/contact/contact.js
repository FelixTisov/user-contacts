import React, { useEffect, useState } from 'react'
import './contact.scss'

function Contact({ contact, getContactData, isNew, deleteHandler }) {
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [form, setForm] = useState({
    UserID: localStorage.getItem('UserID'),
    ContactName: '',
    ContactPhone: '',
    ContactEmail: '',
    ContactAdditionalData: [],
  })

  useEffect(() => {
    if (!isNew)
      setForm({
        ContactID: contact.ContactID,
        UserID: localStorage.getItem('UserID'),
        ContactName: contact.ContactName,
        ContactPhone: contact.ContactPhone,
        ContactEmail: contact.ContactEmail,
        ContactAdditionalData: JSON.parse(
          JSON.stringify(eval(contact.ContactAdditionalData))
        ),
      })
  }, [contact])

  // Выпадающий список выбора нового поля
  const OpenFolder = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  // Начать редактирование
  const EditContact = () => {
    setEdit(true)
  }

  // Обработчик изменения формы
  const inputHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // Сохранить контакт
  const saveContactHandler = () => {
    setEdit(false)
    getContactData(form)
  }

  // Обработчик нажатия на кнопку "Удалить"
  const deleteContact = () => {
    deleteHandler(form.ContactID)
  }

  return (
    <div className="container">
      <div className="container_header">
        <input
          type="text"
          placeholder="Имя контакта"
          value={form.ContactName}
          name="ContactName"
          onChange={inputHandler}
        />
        {!edit && !isNew ? (
          <div className="container_btn">
            <img
              src={require('../../icons/editcontact.svg')}
              alt="Edit contact"
              className="header-button"
              onClick={EditContact}
            />

            <img
              src={require('../../icons/deletecontact.svg')}
              alt="Delete contact"
              className="header-button"
              onClick={deleteContact}
            />
          </div>
        ) : (
          <button className="container_header_btn" onClick={saveContactHandler}>
            Сохранить
          </button>
        )}
      </div>
      <div className="container_body">
        <label className="input-container_label">Номер телефона</label>
        <input
          type="text"
          placeholder="Введите номер телефона"
          value={form.ContactPhone}
          name="ContactPhone"
          onChange={inputHandler}
        />
        <label className="input-container_label">Электронная почта</label>
        <input
          type="email"
          placeholder="Введите потчу"
          value={form.ContactEmail}
          name="ContactEmail"
          onChange={inputHandler}
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
