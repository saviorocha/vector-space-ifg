import React, { FunctionComponent, useEffect, useState } from "react";
import { IBottomItemProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";

const BottomItem: FunctionComponent<IBottomItemProps> = ({
  title,
  icon,
  handleOnClick,
}) => {
  const [itemDisplay, setItemDisplay] = useState<string>("hidden");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // console.log("isActive", isActive);
  }, [isActive]);

  return (
    <section
      onMouseEnter={() => {
        setItemDisplay("visible");
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setItemDisplay("hidden");
        setIsActive(false);
      }}
      className={styles.itembox}
      onClick={handleOnClick}
    >
      <div className={styles.items}>
        {icon}
        <p
          style={{
            display: isActive ? "flex" : "none",
            // visibility: itemDisplay,
          }}
          className={styles.title}
        >
          {title}
        </p>
      </div>
    </section>
  );
};

export default BottomItem;
