import React, { FunctionComponent, useState } from "react";
import { IHoverableDivProp } from "../../interfaces/interfaces";
import styles from "../../styles/modules/hoverdiv.module.css";

/**
 * Shows a dialog text div component when hovering over it
 */
const HoverableComponent: FunctionComponent<IHoverableDivProp> = ({
  hoverText,
  children,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <section onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {children}
      {isHovering && <div className={styles.hoverdiv}>{hoverText}</div>}
    </section>
  );
};

export default HoverableComponent;
