import React, { FunctionComponent, useState } from "react";
import { Settings } from "react-feather";
import { PropsChildren } from "../../interfaces/interfaces";
import styles from "../../styles/modules/config.module.css";
import { useTheme } from "next-themes";

const PopupWindow: FunctionComponent<PropsChildren> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();
  return (
    <>
      <section
        id={styles.configpopup}
        className="
          bg-gray-200 border-neutral-400
          dark:bg-zinc-900 dark:border-black
        "
        style={{
          visibility: isActive ? "visible" : "hidden",
          opacity: isActive ? 1 : 0,
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
