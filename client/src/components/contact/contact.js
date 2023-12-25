import React, { useEffect, useState } from 'react'
import Birthday from '../../plugins/birthday_plugin/birthday'
import './contact.scss'

function Contact({ contact, getContactData, isNew, deleteHandler }) {
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [form, setForm] = useState({
    UserID: localStorage.getItem('UserID'),
    ContactName: '',
    ContactPhone: [''],
    ContactEmail: [''],
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
        ContactAdditionalData: contact.ContactAdditionalData,
      })
  }, [contact])

  // Выпадающий список выбора нового поля
  const OpenFolder = () => {
    setIsOpen((value) => !value)
  }

  // Начать редактирование
  const EditContact = () => {
    setEdit(true)
  }

  // Обработчик изменения поля имени
  const inputNameHandler = (event) => {
    setForm({ ...form, ['ContactName']: event.target.value })
  }

  // Обработчик изменения полей, содержащих множество значений
  const inputHandler = (index) => {
    let editableField = form[event.target.name]
    editableField[index] = event.target.value
    setForm({
      ...form,
      [event.target.name]: editableField,
    })
  }

  // Добавление нового поля контакта
  const addNewFieldHandler = (type) => {
    switch (type) {
      case 'phone':
        contact.ContactPhone.push('')
        break
      case 'email':
        contact.ContactEmail.push('')
        break
      case 'birthday':
        contact.ContactAdditionalData.push({
          pluginType: 'bd_plugin',
          content: '',
        })
        break
      default:
        break
    }
    OpenFolder()
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

  // Изменение значения поля content плагина
  const changePluginContent = (newContent, index) => {
    const newAddData = form.ContactAdditionalData
    newAddData[index].content = newContent

    setForm({
      ...form,
      ['ContactAdditionalData']: newAddData,
    })
  }

  return (
    <div className={`container`}>
      <div className="container_header">
        <input
          disabled={edit || isNew ? false : true}
          type="text"
          placeholder="Имя контакта"
          value={form.ContactName}
          name="ContactName"
          onChange={inputNameHandler}
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
        <label className="input-container_label">Номер телефона:</label>
        {form.ContactPhone.map((item, index) => (
          <input
            key={index}
            disabled={edit || isNew ? false : true}
            type="text"
            placeholder="Введите номер телефона"
            value={item}
            name="ContactPhone"
            onChange={() => inputHandler(index)}
          />
        ))}

        <label className="input-container_label">Электронная почта:</label>
        {form.ContactEmail.map((item, index) => (
          <input
            key={index}
            disabled={edit || isNew ? false : true}
            type="email"
            placeholder="Введите потчу"
            value={item}
            name="ContactEmail"
            onChange={() => inputHandler(index)}
          />
        ))}

        <div className="plugins-container">
          {form.ContactAdditionalData.map((item, index) => (
            <div className="plugin" key={index}>
              {item.pluginType === 'bd_plugin' ? (
                <Birthday
                  data={item.content}
                  index={index}
                  changePluginContent={changePluginContent}
                />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        {edit || isNew ? (
          <div>
            <button className="menu" onClick={OpenFolder}>
              Добавить
            </button>
            <div className={`${!isOpen ? 'active' : 'inactive'}`}>
              <span onClick={() => addNewFieldHandler('phone')}>Телефон</span>
              <span onClick={() => addNewFieldHandler('email')}>Почта</span>
              <span onClick={() => addNewFieldHandler('birthday')}>
                Дата рождения
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Contact
