import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./index.module.scss";
import ContactList from "../home/ContactList";
import InfoPlugin from "./InfoPlugin";

function Plugin() {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__list"]}>
        <ContactList />
      </div>
      <InfoPlugin />
    </div>
  );
}

export default Plugin;
