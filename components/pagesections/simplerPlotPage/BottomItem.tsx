import { useTheme } from "next-themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IBottomItemProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";

const BottomItem: FunctionComponent<IBottomItemProps> = ({
  title,
  icon,
  handleOnClick = undefined,
  children = null,
}) => {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    // console.log("isActive", isActive);
  }, [isActive]);

  useEffect(() => {
    // console.log("showChildren", showChildren);
    // console.log("onClick", handleOnClick);
  }, [showChildren]);

  return (
    <>
      <section
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        className={styles.itembox}
        style={{
          height: showChildren ? "fit-content" : "60px",
          backgroundColor: theme === "dark" ? "#000000c5" : "#f0f8ffc5",
          borderColor: theme === "dark" ? "#6a6a6a" : "#9ca3af",
        }}
      >
        <div
          className={styles.items}
          onClick={
            handleOnClick
              ? handleOnClick
              : () => {
                  setShowChildren(!showChildren);
                }
          }
        >
          {icon}
          {showChildren ? (
            <p className={styles.title}>{title}</p>
          ) : (
            <p
              style={{
                display: isActive ? "flex" : "none",
              }}
              className={styles.titlehov}
            >
              {title}
            </p>
          )}
        </div>
        <div
          className={styles.hiddencontent}
          style={{
            display: showChildren ? "block" : "none",
            height: showChildren ? "fit-content" : "0",
          }}
        >
          {children}
        </div>
      </section>
    </>
  );
};

export default BottomItem;
