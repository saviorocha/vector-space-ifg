import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import React, { useState } from "react";
import { Grid, Hash, Settings } from "react-feather";
import { Transition } from "react-transition-group";
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: 20,
  display: "inline-block",
  backgroundColor: "#b3d0ff",
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const TransitionExample = () => {
  const [inProp, setInProp] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [mode, setMode] = useState("dark");

  return (
    <>
      <div>
        <button onClick={() => setInProp(!inProp)}>Click to Show</button>

        <Transition in={inProp} timeout={300}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              Im a component that gets a Fade transition!
            </div>
          )}
        </Transition>
      </div>
      <div>
        <Transition in={isSettingsActive} timeout={400}>
          {(state) => (
            <section
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              // className={styles.settings}
              // transition transition-opacity ease-in-out duration-700
            >
              <ul className="mt-3 ">
                <li className="flex items-center justify-start ml-2 p-1 ">
                  <DarkModeToggle
                    mode={mode}
                    size="sm"
                    inactiveTrackColor="#e2e8f0"
                    inactiveTrackColorOnHover="#f8fafc"
                    inactiveTrackColorOnActive="#cbd5e1"
                    activeTrackColor="#334155"
                    activeTrackColorOnHover="#1e293b"
                    activeTrackColorOnActive="#0f172a"
                    inactiveThumbColor="#1e293b"
                    activeThumbColor="#e2e8f0"
                    onChange={(mode) => {
                      setMode(mode);
                    }}
                  />
                  Tema
                </li>
                <li className="flex items-center justify-start ml-2 p-1 ">
                  <Grid />
                  Grid
                </li>
                <li className="flex items-center justify-start ml-2 p-1 ">
                  <Hash />
                  Mostrar números
                </li>
              </ul>
            </section>
          )}
        </Transition>
        <button className="fixed top-0 right-0 mr-6 mt-6">
          <Settings
            className="text-gray-700 w-7 h-7"
            onClick={() => setIsSettingsActive(!isSettingsActive)}
          />
        </button>
      </div>
    </>
  );
};

export default TransitionExample;
