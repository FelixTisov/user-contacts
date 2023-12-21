import { useNavigate } from "react-router-dom";
import React from "react";
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
