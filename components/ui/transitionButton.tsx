import { useState } from "react";
import { Transition } from "react-transition-group";

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};
/**
 * sectionStyle: must have a transition property!
 * @param param0 
 * @returns 
 */
const TransitionButton = ({ children, icon, sectionStyle, buttonStyle }) => {
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
