import React from "react";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__link"]}>
        <span>Профиль</span>
      </div>
      <div className={styles["header__link"]}>
        <span>Плагины</span>
      </div>
      <div className={styles["header__link"]}>
        <span>Экспорт</span>
      </div>
      <div className={styles["header__link"]}>
        <span>Импорт</span>
      </div>
    </header>
  );
};
export default Header;
