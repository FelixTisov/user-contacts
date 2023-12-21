import React from "react";
import styles from "./index.module.scss";

const InputSearch = (props) => {
  const { label, placeholder } = props;

  return (
    <div className={styles["input"]}>
      <input
        className={styles["input__input"]}
        type="text"
        placeholder={placeholder}
      ></input>
    </div>
  );
};
export default InputSearch;
