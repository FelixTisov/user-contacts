import React, { useState } from "react";
import styles from "./index.module.scss";
import InputText from "../../../shared/components/inputs/inputText";

const Contact = () => {
  const [contact, setContact] = useState([3]);
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const OpenFolder = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const EditContact = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__header"]}>
        <div className={styles["container__header__label"]}>
          <span>Имя контакта</span>
          {!edit ? (
            <div className={styles["container__btn"]}>
              <button className={styles["container__header__btn"]}>
                Импорт
              </button>
              <button
                className={styles["container__header__btn"]}
                onClick={EditContact}
              >
                Редактировать
              </button>

              <button className={styles["container__header__btn"]}>
                Удалить
              </button>
            </div>
          ) : (
            <button className={styles["container__header__btn"]}>
              Сохранить
            </button>
          )}
        </div>
      </div>
      <div className={styles["container__body"]}>
        <InputText
          label={"Номер телефона"}
          placeholder={"Введите номер телефона"}
        />
        {edit ? (
          <div>
            <button
              className={styles["menu"]}
              onClick={OpenFolder}
            >
              Добавить
            </button>
            <div className={styles[`${!isOpen ? "active" : "inactive"}`]}>
              <span>Телефон</span>
              <span>Почта</span>
              <span>Дата рождения</span>
              <span>Адрес</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Contact;
