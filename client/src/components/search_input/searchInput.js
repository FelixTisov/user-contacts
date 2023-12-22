import React, { useState, useRef } from 'react'
import './searchInput.scss'

const SearchInput = (props) => {
  const { label, placeholder, onChange } = props
  const [textValue, setTextValue] = useState('')
  const ref = useRef()

  const onChangeText = (e) => {
    onChange?.(e)
    setTextValue(ref.current.value)
  }

  return (
    <input
      className="search-input"
      ref={ref}
      type="text"
      placeholder={placeholder}
      onChange={onChangeText}
    ></input>
  )
}
export default SearchInput
