import React from 'react'
import './contactItem.scss'

const ContactItem = ({ name }) => {
  return (
    <div className="item">
      <span className="item_text">{name}</span>
    </div>
  )
}
export default ContactItem
