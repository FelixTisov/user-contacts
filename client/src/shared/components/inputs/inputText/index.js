import React from "react";
import styles from "./index.module.scss";

const InputText = (props) => {
  const { placeholder, label } = props;

  return (
    <div className={styles["input"]}>
      <label className={styles["input__label"]}>{label}</label>
      <input
        className={styles["input__input"]}
        type="text"
        placeholder={placeholder}
      ></input>
    </div>
  );
};
export default InputText;
