import React, { useEffect, useState } from 'react'
import './birthday.scss'

function Birthday({ data, index, changePluginContent }) {
  const [currentValue, setValue] = useState(data)

  const inputHandler = (event) => {
    setValue(event.target.value)
    changePluginContent(event.target.value, index)
  }

  return (
    <div className="birthday">
      <label className="input-container_label">День рождения:</label>
      <input
        type="email"
        placeholder="Введите потчу"
        value={currentValue}
        name="ContactEmail"
        onChange={inputHandler}
      />
    </div>
  )
}

export default Birthday
