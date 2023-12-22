import React, { useRef, useState } from 'react'
import './textInput.scss'

const TextInput = ({ label, value, placeholder }) => {
  const [textValue, setTextValue] = useState('')
  const ref = useRef()

  const onChangeText = (e) => {
    onChange?.(e)
    setTextValue(ref.current.value)
  }

  return (
    <div className="input-container">
      <label className="input-container_label">{label}</label>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeText}
      ></input>
    </div>
  )
}
export default TextInput
