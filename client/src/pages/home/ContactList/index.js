import React, { useState } from "react";
import styles from "./index.module.scss";
import InputSearch from "../../../shared/components/inputs/inputSearch";
import ContactItem from "../ContactItem";

const ContactList = () => {
  const [list, setList] = useState([3]);
  const [isOpen, setIsOpen] = useState(true);

  const OpenFolder = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles["list"]}>
      <div className={styles["list__action"]}>
        <button>Добавить</button>
        <div>
          <button className={styles["list__action__menu"]} onClick={OpenFolder}>
            Фильтр
          </button>
          <div className={styles[`${!isOpen ? "active" : "inactive"}`]}>
            <span>По имени</span>
            <span>По чему</span>
          </div>
        </div>
      </div>
      <div className={styles["list__search"]}>
        <InputSearch label={"Поиск"} placeholder={"Поиск"} />
      </div>
      <div className={styles["list__contacts"]}>
        {list.map((index) => (
          <div key={index}>
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
            <ContactItem name={"Федя"} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContactList;
