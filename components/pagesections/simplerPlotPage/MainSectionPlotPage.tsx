import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { evaluate } from "mathjs";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import {
  Globe,
  Hash,
  LifeBuoy,
  Play,
  Settings,
  ZoomIn,
  ZoomOut,
} from "react-feather";
import StateList from "../../../classes/stateList";
import Transformation from "../../../classes/transformation";
import { useD3Context, useListContext } from "../../../context";
import useList from "../../../hooks/useList";
import { IMainSectionProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/simpleplot.module.css";
import {
  validateTransformationName,
  validateTransformationValues,
} from "../../../utils";
import D3Plot from "../../d3/D3plot";
import KeyboardIcon from "../../icons/KeyboardIcon";
import RenderTex from "../../tex/RenderTex";
import RoundButton from "../../ui/RoundButton";
import TransformationForm from "../../ui/TransformationForm";
import TransitionButton from "../../ui/TransitionButton";
import PlotTransformation from "./PlotTransformation";
import PlotVectors from "./PlotVectors";

const btnClassName = `rounded-full h-10 w-10 right-0
flex items-center justify-center 
bg-gray-50 bg-opacity-75 border border-gray-200`;

/**
 * Central part of the edit page; it's divided in left, middle and right sections
 */
const MainSectionPlotPage: FunctionComponent<IMainSectionProps> = ({
  mainStyle,
  children,
}) => {
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const router = useRouter();
  const { list, setList, stateVecArr, setStateVecArr } = useListContext();
  const { addTransformation, updateTransformation, removeTransformation } =
    useList();
  const { hideNumbers, setHideNumbers } = useD3Context();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<Mode>("dark");
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );
  // const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());

  /**
   * Adds a new transformation to the list based on the matrix and name submited
   */
  const transfromationSubmitHandler = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value
      ? event.target.name.value
      : `T_{${stateVecArr.vectorArr.length}}`;

    // validate submited data
    if (
      !validateTransformationName(name) ||
      !validateTransformationValues([
        event.target.t0.value,
        event.target.t2.value,
        event.target.t1.value,
        event.target.t3.value,
      ])
    ) {
      alert("transformação inválida");
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

    // updates the list context
    setList(newList);
    setStateVecArr(list.toArray());
    setToggleTrnInput(false);
  };

  useEffect(() => {
    console.log("stateVecArr", stateVecArr.transformationArr.length);
  }, []);

  return (
    <main
      className="
        mx-auto absolute h-full right-0
        flex justify-center items-center
      "
      id={styles.main}
      style={mainStyle}
    >
      <section
        id={styles.leftsection}
        className="h-full flex items-center justify-around flex-col"
      >
        {children}
      </section>

      <section
        id={styles.middlesection}
        // className="h-full flex items-center justify-center"
        className="
          relative gap-1 overflow-hidden
          flex items-center justify-around flex-row 
        "
        // h-full overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0
      >
        <ArcherContainer>
          <div className="flex flex-row items-center">
            {stateVecArr.vectorArr.map((vectors, i) => {
              return (
                <div key={i} className="mr-20">
                  <ArcherElement
                    id={`element-${i}`}
                    relations={
                      i === stateVecArr.vectorArr.length - 1
                        ? undefined
                        : [
                            {
                              targetId: `element-${i + 1}`,
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: { strokeColor: "black", strokeWidth: 1 },
                              label: (
                                <RenderTex
                                  mathExpression={`${
                                    stateVecArr.transformationArr[i + 1].name
                                  }`}
                                  classStyle={styles.transformationarrow}
                                />
                              ),
                            },
                          ]
                    }
                  >
                    <aside className="flex items-center justify-center">
                      <aside
                        className="
                          flex flex-col items-center 
                          bg-neutral-100 rounded-md w-11/12
                        "
                      >
                        <D3Plot index={i} />
                        <PlotVectors vectors={vectors} plotIndex={i} key={i} />
                      </aside>
                    </aside>
                  </ArcherElement>
                </div>
              );
            })}
          </div>
          <section className="flex justify-center">
            <section
              className="
                rounded-md w-1/4 h-28 overflow-auto
                flex flex-col items-center justify-center
                bg-white border border-gray-400
                text-sm shadow-md relative
              "
            >
              {stateVecArr.transformationArr[1] ? (
                <PlotTransformation
                  transformation={stateVecArr.transformationArr[1]}
                  trnIndex={1}
                />
              ) : (
                <button
                  onClick={() => {
                    setToggleTrnInput(true);
                  }}
                >
                  Adicionar transformação
                </button>
              )}
              {toggleTrnInput && (
                <TransformationForm
                  onSubmit={transfromationSubmitHandler}
                  updateOrCreate="create"
                  matrixArr={transformation.e1.concat(transformation.e2)}
                />
              )}
            </section>
          </section>
        </ArcherContainer>
      </section>

      <section
        id={styles.rightsection}
        className="h-full flex items-center justify-between flex-col"
      >
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
          <ul className="mt-3 ">
            <li className="flex items-center justify-start ml-2 p-1">
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
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              />
              Tema
            </li>
            <li className="flex items-center justify-start ml-2 p-1">
              <Globe />
              Grid
            </li>
            <li
              className="flex items-center justify-start ml-2 p-1"
              id="toggle-numbers"
              onClick={() => {
                setHideNumbers(!hideNumbers);
              }}
            >
              <Hash />
              Mostrar números
            </li>
          </ul>
        </TransitionButton>

        <div
          id="bottom-buttons"
          className="flex items-center justify-center flex-col"
        >
          <RoundButton
            classString={btnClassName}
            icon={<Play className="text-gray-700" />}
            handleOnClick={() => {
              router.push("/animationplane");
            }}
          />
          <KeyboardIcon />
          {/* <button
            onClick={handleResetList}
            className="
              rounded-full h-12 w-12 
              
              bg-gray-50 bg-opacity-75 border border-gray-200 
            "
          >
            <Trash className="text-gray-700" />
          </button> */}
        </div>
      </section>
    </main>
  );
};

export default MainSectionPlotPage;
