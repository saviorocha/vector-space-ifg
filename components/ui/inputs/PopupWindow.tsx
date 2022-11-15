import { FunctionComponent, useState } from "react";
import { Settings, X } from "react-feather";
import { PropsChildren } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/ui/config.module.css";

const PopupWindow: FunctionComponent<PropsChildren> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
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
        <section className={styles.top}>
          <button className={styles.x} onClick={() => {
            setIsActive(false)
          }}>
            <X />
          </button>
        </section>
        {children}
      </section>
      <button
        className="z-10 absolute top-5 right-5"
        onClick={() => setIsActive(!isActive)}
      >
        <Settings size={35} />
      </button>
    </>
  );
};

export default PopupWindow;
