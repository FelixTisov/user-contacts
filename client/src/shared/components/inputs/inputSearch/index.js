import React, { useState, useRef } from "react";
import styles from "./index.module.scss";

const InputSearch = (props) => {
  const { label, placeholder, onChange } = props;
  const [textValue, setTextValue] = useState("");
  const ref = useRef();

  const onChangeText = (e) => {
    onChange?.(e);
    setTextValue(ref.current.value);
  };

  return (
    <div className={styles["input"]}>
      <input
        ref={ref}
        className={styles["input__input"]}
        type="text"
        placeholder={placeholder}
        onChange={onChangeText}
      ></input>
    </div>
  );
};
export default InputSearch;
