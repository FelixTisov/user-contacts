import React, { useState } from "react";
import styles from "./index.module.scss";
import InputText from "../../../shared/components/inputs/inputText";

const InfoPlugin = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__header"]}>
        <div className={styles["container__header__label"]}>
          <span>Название плагина</span>
          <div className={styles["container__btn"]}>
            <button className={styles["container__header__btn"]}>
              Добавить
            </button>
            <button className={styles["container__header__btn"]}>
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div className={styles["container__body"]}>
        <span>Описание плагина</span>
      </div>
    </div>
  );
};
export default InfoPlugin;
