import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Globe, Hash, Plus, Settings } from "react-feather";
import { Transition } from "react-transition-group";
import StateList from "../../classes/stateList";
import Vector from "../../classes/vector";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import styles from "../../styles/modules/bottombar.module.css";
import KeyboardIcon from "../icons/KeyboardIcon";
import RenderTex from "../tex/RenderTex";
import TransitionButton from "../ui/TransitionButton";
import VirtualKeyboard from "../ui/VirtualKeyboard";
import { validateVectorName, validateVectorValues } from "../../utils";
import { evaluate } from "mathjs";
import KeyboardWrapper from "../tex/KeyboardWrapper";
import Transformation from "../../classes/transformation";
import useTexStr from "../../hooks/useTexStr";

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
  const [toggleInput, setToggleInput] = useState(false);
  const { currentPlot } = useNameContext();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addVector } = useList();
  const { vectorNameCounter, setVectorNameCounter } = useNameContext();

  const [transformation, setTransformation] = useState<Transformation>(
    stateVecArr.transformationArr[currentPlot]
  );
  const [input, setInput] = useState("");
  const keyboard = useRef(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
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

    setInput(input);
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") {
      const expression: string = event.target.value
        .replace("π", "pi")
        .replace("√", "sqrt")
        .replace("²", "^2")
        .replace("³", "^3")
        .replace("×", "*")
        .replace("₀", "_{0}")
        .replace("₁", "_{1}")
        .replace("₂", "_{2}")
        .replace("₃", "_{3}")
        .replace("₄", "_{4}")
        .replace("₅", "_{5}")
        .replace("₆", "_{6}")
        .replace("₇", "_{7}")
        .replace("₈", "_{8}")
        .replace("₉", "_{9}");

      const name = expression.includes("=")
        ? expression.split("=")[0]
        : `v_{${vectorNameCounter}}`;

      const values = expression.includes("=")
        ? expression
            .split("=")[1]
            .slice(1, self.length - 1)
            .split(",")
        : expression.slice(1, self.length - 1).split(",");

      if (
        !validateVectorName(name) ||
        !validateVectorValues(
          expression.includes("=") ? expression.split("=")[1] : expression
        )
      ) {
        // console.log(name, expression);
        // console.log(event.target.value);
        alert("naum");
        return;
      }

      const newHead = addVector(
        new Vector([evaluate(values[0]), evaluate(values[1])], `${name}`)
      );
      const newList = new StateList(newHead);
      setList(newList);
      setStateVecArr(newList.toArray());

      // gonna improve this later, sorry
      if (name === `v_{${vectorNameCounter}}`) {
        setVectorNameCounter(vectorNameCounter + 1);
      }
      event.target.value = "";
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    // setVectorNameCounter(vectorNameCounter + 1);
    // console.log("vectors", stateVecArr[0]);
    // console.log("stateVecArr", stateVecArr);
  }, [stateVecArr]);

  useEffect(() => {
    // console.log("mainsectionArr", stateVecArr.length - 1);
    // console.log("currentPlot", stateVecArr[currentPlot]);
    setTransformation(stateVecArr.transformationArr[currentPlot]);
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
                        {currentPlot !== 0 ? (
                          <>
                            <RenderTex
                              mathExpression={`${transformation.name}\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}`}
                              title="Transformação de R2 em R2"
                            />
                            <RenderTex
                              mathExpression={String.raw`
                          ${transformation.name}(a,b) = \begin{bmatrix}
                          ${transformation.e1[0]} & ${transformation.e2[0]}\\
                          ${transformation.e1[1]} & ${transformation.e2[1]}
                            \end{bmatrix}\begin{bmatrix}
                              a\\
                              b
                            \end{bmatrix}
                          `}
                              title="Matriz de transformação"
                            />
                          </>
                        ) : null}
                      </div>
                      <button className="absolute bottom-1 left-1">
                        <Plus />
                      </button>
                    </aside>

                    <aside className="relative w-1/2 h-full flex flex-col justify-around items-center overflow-scroll">
                      <div>
                        {stateVecArr.vectorArr[currentPlot].map((vec, i) => {
                          // console.log("bottomBar/vec:", vec)
                          return (
                            <RenderTex
                              key={i}
                              mathExpression={`${vec.name}=(${vec.x},${vec.y})`}
                              title="Vetor resultante da aplicação da transformação T"
                            />
                          );
                        })}
                      </div>
                      {currentPlot === 0 ? (
                        <button
                          className="absolute bottom-1 left-1"
                          onClick={() => {
                            setToggleInput(!toggleInput);
                          }}
                        >
                          <Plus />
                        </button>
                      ) : null}
                      {toggleInput && currentPlot === 0 ? (
                        <input
                          className="border border-slate-400"
                          onKeyDown={handleEnter}
                          value={input}
                          onChange={(e) => onChangeInput(e)}
                        />
                      ) : null}
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
