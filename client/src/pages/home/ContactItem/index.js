import React from "react";
import styles from "./index.module.scss";

const ContactItem = (props) => {
  const { name } = props;

  return (
    <div className={styles["item"]}>
      <span className={styles["item__text"]}>{name}</span>
    </div>
  );
};
export default ContactItem;
