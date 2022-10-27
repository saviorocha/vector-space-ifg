import React, { FunctionComponent, useEffect, useState } from "react";
import { IHoverableDivProp } from "../../interfaces/interfaces";
import styles from "../../styles/modules/hoverdiv.module.css";
import RenderTex from "../tex/RenderTex";

/**
 * Shows a dialog text div component when hovering over it
 */
const HoverableComponent: FunctionComponent<IHoverableDivProp> = ({
  hoverText = "",
  hoverTexExpression = "",
  children,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // useEffect(() => {
  //   console.log();
  // }, []);

  return (
    <section onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {children}
      {isHovering && (
        <div className={styles.hoverdiv}>
          {hoverText}
          {hoverTexExpression && (
            <RenderTex mathExpression={hoverTexExpression} />
          )}
        </div>
      )}
    </section>
  );
};

export default HoverableComponent;
