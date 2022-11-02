import React, { FunctionComponent, useState } from "react";
import { Settings } from "react-feather";
import { PropsChildren } from "../../interfaces/interfaces";
import styles from "../../styles/modules/config.module.css";

const PopupWindow: FunctionComponent<PropsChildren> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <section
        className={styles.configpopup}
        style={{
          visibility: isActive ? "hidden" : "visible",
          opacity: isActive ? 0 : 1,
        }}
      >
        {children}
      </section>
      <button
        className="z-10 absolute top-0"
        onClick={() => setIsActive(!isActive)}
      >
        <Settings size={35} />
      </button>
    </>
  );
};

export default PopupWindow;
