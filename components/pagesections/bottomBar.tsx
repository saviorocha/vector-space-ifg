import { evaluate } from "mathjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Edit3, Globe, Hash, Plus, Settings } from "react-feather";
import { Transition } from "react-transition-group";
import StateList from "../../classes/stateList";
import Transformation from "../../classes/transformation";
import { useListContext, useNameContext } from "../../context";
import useList from "../../hooks/useList";
import useTexStr from "../../hooks/useTexStr";
import styles from "../../styles/modules/bottombar.module.css";
import { validateTransformationName } from "../../utils";
import KeyboardIcon from "../icons/KeyboardIcon";
import KeyboardWrapper from "../tex/KeyboardWrapper";
import RenderTex from "../tex/RenderTex";
import TransitionButton from "../ui/TransitionButton";

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
  const [toggleVecInput, setToggleVecInput] = useState(false);
  const [toggleTrnInput, setToggleTrnInput] = useState(false);
  const [showMatrix, setShowMatrix] = useState(true);

  const [input, setInput] = useState("");
  const keyboard = useRef(null);

  const { vectorFromTex } = useTexStr();
  const { currentPlot } = useNameContext();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addVector, addTransformation } = useList();
  const [transformation, setTransformation] = useState<Transformation>(
    stateVecArr.transformationArr[currentPlot]
  );

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

  const vectorSubmitHandler = (event: any) => {
    if (event.key === "Enter") {
      const newVector = vectorFromTex(event.target.value);

      if (!newVector) {
        alert("naum");
        return;
      }
      const newHead = addVector(newVector);
      const newList = new StateList(newHead);
      setList(newList);
      setStateVecArr(newList.toArray());

      event.target.value = "";
    }
  };

  const transfromationSubmitHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : `T_{${stateVecArr.vectorArr.length}}`;

    if (!validateTransformationName(name)) {
      alert("nope");
      return;
    }
    const newHead = addTransformation(
      new Transformation(
        [evaluate(event.target.t0.value), evaluate(event.target.t2.value)],
        [evaluate(event.target.t1.value), evaluate(event.target.t3.value)],
        name
      ),
      transformation.name
    );
    const newList = new StateList(newHead);
    // console.log("newList", newList);
    setList(newList);
    setStateVecArr(list.toArray());
    setToggleTrnInput(false);
  };

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  useEffect(() => {
    // setVectorNameCounter(vectorNameCounter + 1);
    // console.log("vectors", stateVecArr[0]);
    // console.log("stateVecArr", stateVecArr);
  }, [stateVecArr]);

  useEffect(() => {
    // console.log("mainsectionArr", stateVecArr.length - 1);
    // console.log("currentPlot", stateVecArr[currentPlot]);
    // console.log("currentPlot", currentPlot);
    // console.log("stateVecArr", stateVecArr.transformationArr)
    // console.log(
    //   "transformationArr",
    //   stateVecArr.transformationArr[currentPlot]
    // );
    // console.log("e1", transformation.e1.concat(transformation.e2));
    // setTeste(2);
    // console.log(teste);
    // console.log("transformation que era pra ser", stateVecArr.transformationArr[currentPlot])
    // console.log("vetores: ", stateVecArr.vectorArr[currentPlot]);
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
                      id="transformationsAside"
                      className="relative w-1/2 h-full flex-col flex justify-around items-center"
                      style={{
                        borderRight: "1px solid #c0c0c0",
                      }}
                    >
                      <div>
                        {currentPlot !== 0 && showMatrix ? (
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
                      <button
                        className="absolute top-1 left-1"
                        onClick={() => {
                          setToggleTrnInput(!toggleTrnInput);
                          setShowMatrix(!showMatrix);
                        }}
                      >
                        <Edit3 />
                      </button>
                      <button
                        className="absolute bottom-1 left-1"
                        onClick={() => {
                          setToggleTrnInput(!toggleTrnInput);
                        }}
                      >
                        <Plus />
                      </button>
                      {toggleTrnInput ? (
                        <form onSubmit={transfromationSubmitHandler}>
                          {transformation.e1
                            .concat(transformation.e2)
                            .map((el, i) => {
                              return (
                                <>
                                  <input
                                    key={i}
                                    className="border-2 border-slate-400 w-10"
                                    type="text"
                                    id={`t${i}`}
                                    defaultValue={showMatrix ? 0 : el}
                                  />
                                  {i === 1 ? <br key={i+1} /> : null}
                                </>
                              );
                            })}
                          {/* <input
                            className="border-2 border-slate-400 w-10"
                            type="text"
                            id="t00"
                            defaultValue={0}
                          />
                          <input
                            className="border-2 border-slate-400 w-10"
                            type="text"
                            id="t01"
                            defaultValue={0}
                          />
                          <br />
                          <input
                            className="border-2 border-slate-400 w-10"
                            type="text"
                            id="t10"
                            defaultValue={0}
                          />
                          <input
                            className="border-2 border-slate-400 w-10"
                            type="text"
                            id="t11"
                            defaultValue={0}
                          /> */}
                          <br />
                          <input
                            className="border-2 border-slate-400 w-10"
                            type="text"
                            id="name"
                            name="name"
                          />

                          <button
                            className="border-2 border-slate-400 rounded-md w-14"
                            type="submit"
                          >
                            Submit
                          </button>
                        </form>
                      ) : null}
                    </aside>

                    <aside
                      id="vectorsAside"
                      className="
                        relative w-1/2 h-full overflow-scroll
                        flex flex-col justify-around items-center
                      "
                    >
                      <div>
                        {stateVecArr.vectorArr[currentPlot].map((vec, i) => {
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
                            setToggleVecInput(!toggleVecInput);
                          }}
                        >
                          <Plus />
                        </button>
                      ) : null}
                      {toggleVecInput && currentPlot === 0 ? (
                        <input
                          className="border border-slate-400"
                          onKeyDown={vectorSubmitHandler}
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
