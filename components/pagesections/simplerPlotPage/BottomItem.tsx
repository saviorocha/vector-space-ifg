import React, { useState } from "react";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";

const BottomItem = ({ title, icon }) => {
  const [itemDisplay, setItemDisplay] = useState("none");

  return (
    <section
      onMouseEnter={() => {
        setItemDisplay("block");
      }}
      onMouseLeave={() => {
        setItemDisplay("none");
      }}
      className={styles.itembox}
    >
      {icon}
      <p
        style={{
          display: itemDisplay,
        }}
        className={styles.title}
      >
        {title}
      </p>
    </section>
  );
};

export default BottomItem;
