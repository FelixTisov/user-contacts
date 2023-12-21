import { useNavigate } from "react-router-dom";
import React from "react";
import ContactList from "./ContactList";
import styles from "./index.module.scss";
import Contact from "./Contact";

function Profile() {
  return (
    <div className={styles["container"]}>
      <Contact />
    </div>
  );
}

export default Profile;
