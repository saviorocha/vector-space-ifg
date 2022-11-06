import { FunctionComponent, useState } from "react";
import { Transition } from "react-transition-group";
import { ITransitionButtonProps } from "../../../interfaces/interfaces";

/**
 * sectionStyle: must have a transition property!
 */
const TransitionButton: FunctionComponent<ITransitionButtonProps> = ({
  children,
  icon,
  sectionStyle,
  buttonStyle,
  transitionStyles,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Transition in={isActive} timeout={400}>
        {(state) => (
          <section
            style={{
              ...transitionStyles[state],
            }}
            className={sectionStyle}
          >
            {children}
          </section>
        )}
      </Transition>
      <button className={buttonStyle} onClick={() => setIsActive(!isActive)}>
        {icon}
      </button>
    </>
  );
};

export default TransitionButton;
