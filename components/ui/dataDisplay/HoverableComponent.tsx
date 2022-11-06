import { FunctionComponent, useState } from "react";
import { IHoverableDivProp } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/ui/hoverdiv.module.css";
import RenderTex from "../../tex/RenderTex";

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
        <div
          id={styles.hoverdiv}
          className="
            bg-white border-white
            dark:bg-zinc-900 
          "
        >
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
