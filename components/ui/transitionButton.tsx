import { FunctionComponent, useState } from "react";
import { Transition } from "react-transition-group";
import { ITransitionButtonProps } from "../../interfaces/interfaces";

const transitionStyles: any = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};
/**
 * sectionStyle: must have a transition property!
 */
const TransitionButton: FunctionComponent<ITransitionButtonProps> = ({
  children,
  icon,
  sectionStyle,
  buttonStyle,
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
