import React, { useRef, useState } from "react";
import styles from "./index.module.scss";

const InputText = (props) => {
  const { placeholder, label, onChange } = props;
  const [textValue, setTextValue] = useState("");
  const ref = useRef();

  const onChangeText = (e) => {
    onChange?.(e);
    setTextValue(ref.current.value);
  };

  return (
    <div className={styles["input"]}>
      <label className={styles["input__label"]}>{label}</label>
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
export default InputText;
