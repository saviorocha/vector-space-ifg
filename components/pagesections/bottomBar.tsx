import { useEffect, useState } from "react";
import { Globe, Hash, Plus, Settings } from "react-feather";
import { Transition } from "react-transition-group";
import { useListContext, useNameContext } from "../../context";
import styles from "../../styles/modules/bottombar.module.css";
import KeyboardIcon from "../icons/KeyboardIcon";
import RenderTex from "../tex/RenderTex";
import TransitionButton from "../ui/TransitionButton";
import VirtualKeyboard from "../ui/VirtualKeyboard";

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

const BottomBar = () => {
  const [toggleKeyboard, setToggleKeyboard] = useState(false);
  const { currentPlot } = useNameContext();
  const { stateVecArr } = useListContext();
  const { vectorNameCounter, setVectorNameCounter } = useNameContext();

  useEffect(() => {
    // setVectorNameCounter(vectorNameCounter + 1);
    // console.log("vectors", stateVecArr[0]);
  }, [stateVecArr]);

  useEffect(() => {
    // console.log("mainsectionArr", stateVecArr.length - 1);
    console.log("currentPlot", stateVecArr[currentPlot]);
  }, [currentPlot]);

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
                      <li className="flex items-center justify-start ml-2 p-1 ">
                        <Globe />
                        Mudar formato de nomes
                      </li>
                      <li className="flex items-center justify-start ml-2 p-1 ">
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
                      className="relative w-1/2 h-full flex-col flex justify-around items-center"
                      style={{
                        borderRight: "1px solid #c0c0c0",
                      }}
                    >
                      <div>
                        <RenderTex
                          mathExpression={
                            "T_1\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}"
                          }
                          title="Transformação de R2 em R2"
                        />
                        <RenderTex
                          mathExpression={String.raw`
                            T_{1}(a,b) = \begin{bmatrix}
                              -k & 0\\
                              0 & k
                            \end{bmatrix}\begin{bmatrix}
                              a\\
                              b
                            \end{bmatrix}=\begin{bmatrix}
                              -ka\\
                              kb
                            \end{bmatrix}
                          `}
                          title="Matriz de transformação"
                        />
                      </div>
                      <button className="absolute bottom-1 left-1">
                        <Plus />
                      </button>
                    </aside>

                    <aside className="relative w-1/2 h-full flex flex-col justify-around items-center">
                      <div>
                        {stateVecArr[currentPlot].map((vec, i) => {
                          return (
                            <RenderTex
                              key={i}
                              mathExpression={`${vec.name}=(${vec.x},${vec.y})`}
                              title="Vetor resultante da aplicação da transformação T"
                            />
                          );
                        })}
                        {/* <RenderTex
                          mathExpression={"T_1(e_1)=(1,1)"}
                          title="Vetor resultante da aplicação da transformação T"
                        /> */}
                      </div>
                      <button className="absolute bottom-1 left-1">
                        <Plus />
                      </button>
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
                <VirtualKeyboard />
              </section>
            )}
          </Transition>
        </nav>
      )}
    </Transition>
  );
};

export default BottomBar;
