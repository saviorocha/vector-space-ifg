import { useEffect, useRef, useState } from "react";
import { Globe, Hash, Settings } from "react-feather";
import { Transition } from "react-transition-group";
import { useListContext, useNameContext } from "../../../context";
import useTexStr from "../../../hooks/useTexStr";
import styles from "../../../styles/modules/bottombar.module.css";
import KeyboardIcon from "../../icons/KeyboardIcon";
import KeyboardWrapper from "../../tex/KeyboardWrapper";
import TransitionButton from "../../ui/TransitionButton";
import BottomTransformation from "./BottomTransformation";
import BottomVectors from "./BottomVectors";

const navTransitionStyles: any = {
  entering: { height: "9rem" },
  entered: { height: "30rem" },
  exiting: { height: "30rem" },
  exited: { height: "9rem" },
};

const mainTransitionStyles: any = {
  entering: { height: "100%" },
  entered: { height: "50%" },
  exiting: { height: "50%" },
  exited: { height: "100%" },
};

const keyboardTransitionStyles: any = {
  entering: { height: "0%" },
  entered: { height: "50%" },
  exiting: { height: "50%" },
  exited: { height: "0%" },
};

/**
 * Bottom bar component
 */
const BottomBar = () => {
  const { matrixStrings } = useTexStr();
  const { currentPlot } = useNameContext();
  const { stateVecArr } = useListContext();

  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentTrnExpression, setCurrentTrnExpression] = useState(
    matrixStrings()[0]
  );
  const [toggleKeyboard, setToggleKeyboard] = useState(false);
  const keyboard = useRef(null);

  useEffect(() => {
    // console.log("marixStrings", matrixStrings());
    // console.log("currentTrnExpression", currentTrnExpression);
    // console.log("currentPosition", currentPosition);
  }, [currentTrnExpression]);

  useEffect(() => {
    setCurrentTrnExpression(matrixStrings()[0]);
  }, [currentPlot, stateVecArr]);

  const changeName = (event: any) => {
    event.preventDefault();
    const trnNameArr = matrixStrings();
    setCurrentPosition(
      currentPosition === trnNameArr.length - 1 ? 0 : currentPosition + 1
    );
    setCurrentTrnExpression(trnNameArr[currentPosition]);
  };

  const handleKeyboardChange = (input: string) => {
    // if (input.includes("teste")) {
    //   input = input.replace(
    //     "teste",
    //     String.raw`T\colon \mathbb{R}^{2} \to \mathbb{R}^{2}`
    //   );
    // }

    if (input.includes("√")) {
      input = input.replace("√", "√()");
    }
    if (input.includes("log")) {
      input = input.replace("log", "log()");
    }

    // setInput(input);
  };

  return (
    <Transition in={toggleKeyboard} timeout={400}>
      {(state) => (
        <nav
          id={styles.bottombar}
          style={{
            ...navTransitionStyles[state],
          }}
          // className="
          //     fixed bottom-0 w-full h-36
          //     bg-gray-100 rounded-tr-3xl rounded-tl-3xl shadow-md
          //     border border-gray-400
          //   "
          // flex items-center justify-center
        >
          <Transition in={toggleKeyboard} timeout={400}>
            {(state) => (
              <main
                // className="flex items-center justify-center h-full"
                id={styles.maincontent}
                style={{
                  ...mainTransitionStyles[state],
                }}
              >
                <section id={styles.leftsection} className="">
                  <TransitionButton
                    icon={<Settings className="text-gray-700 w-7 h-7" />}
                    sectionStyle={styles.settings}
                    buttonStyle="z-10"
                    transitionStyles={{
                      entering: { opacity: 0 },
                      entered: { opacity: 1 },
                      exiting: { opacity: 1 },
                      exited: { opacity: 0 },
                    }}
                  >
                    <ul className="mt-3 text-sm">
                      <li className="flex items-center justify-start ml-2 p-1">
                        <Globe />
                        Mudar formato de nomes
                      </li>
                      <li
                        className="flex items-center justify-start ml-2 p-1"
                        onClick={changeName}
                      >
                        <Hash />
                        Mudar formato de transformações
                      </li>
                    </ul>
                  </TransitionButton>
                </section>
                <section id={styles.middlesection} className="mb-7">
                  <section
                    id="title"
                    className="flex items-center justify-around"
                  >
                    <p>Transformação</p>
                    <p>Vetores</p>
                  </section>
                  <section
                    id="information-box"
                    className="
                      rounded-md h-full
                      flex flex-row
                      bg-white border border-gray-400
                      text-sm shadow-md
                    "
                  >
                    <aside
                      id="transformationsAside"
                      className="relative w-1/2 h-full flex-col flex justify-around items-center"
                      style={{
                        borderRight: "1px solid #c0c0c0",
                      }}
                    >
                      <BottomTransformation
                        transformationExpression={currentTrnExpression}
                      />
                    </aside>
                    <aside
                      id="vectorsAside"
                      className="
                        relative w-1/2 h-full overflow-scroll
                        flex flex-col justify-around items-center
                      "
                    >
                      <BottomVectors />
                    </aside>
                  </section>
                </section>
                <section id={styles.rightsection}>
                  <button
                    className="absolute w-9 h-9 top-0 right-0 mr-4 mt-4"
                    onClick={() => setToggleKeyboard(!toggleKeyboard)}
                  >
                    <KeyboardIcon />
                  </button>
                </section>
              </main>
            )}
          </Transition>
          <Transition in={toggleKeyboard} timeout={400}>
            {(state) => (
              <section
                // className="w-96 h-0"
                id={styles.virutalkeyboard}
                style={{
                  ...keyboardTransitionStyles[state],
                }}
              >
                <KeyboardWrapper
                  keyboardRef={keyboard}
                  onChange={handleKeyboardChange}
                />
                {/* <VirtualKeyboard /> */}
              </section>
            )}
          </Transition>
        </nav>
      )}
    </Transition>
  );
};

export default BottomBar;
