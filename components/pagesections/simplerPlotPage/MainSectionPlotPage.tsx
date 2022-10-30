import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { Globe, Hash, Settings } from "react-feather";
import { useD3Context, useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import { IMainSectionProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/simpleplot.module.css";
import D3Plot from "../../d3/D3plot";
import RenderTex from "../../tex/RenderTex";
import TransitionButton from "../../ui/TransitionButton";
import PlotVectors from "./PlotVectors";
import TransformationBar from "./TransformationBar";

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
  const router = useRouter();
  const { stateVecArr } = useListContext();
  const [trnNum, setTrnNum] = useState(stateVecArr.vectorArr.length);
  const { hideNumbers, setHideNumbers } = useD3Context();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<Mode>("dark");
  // const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());

  useEffect(() => {
    // console.log("stateVecArr", stateVecArr);
  }, [stateVecArr]);

  useEffect(() => {
    setTrnNum(stateVecArr.vectorArr.length);
  }, [stateVecArr]);

  return (
    <main
      className={`
        mx-auto absolute right-0 ${trnNum > 1 ? "" : "mt-5"}
        flex justify-center items-center
      `}
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
        className={`
          relative gap-1 overflow-x-scroll overflow-y-hidden
          flex items-center justify-${trnNum > 1 ? "start" : "around"} flex-row 
        `}
        // h-full overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0
      >
        <ArcherContainer>
          <div
            className={`flex ${
              trnNum === 1 ? "flex-col" : "flex-row"
            } items-center mb-20`} // mb-20
          >
            {stateVecArr.vectorArr.map((vectors, i) => {
              return (
                <React.Fragment key={i}>
                  <div>
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
                      <aside
                        id="plot-aside"
                        className="flex items-center justify-center"
                      >
                        <aside
                          className="
                          flex flex-col items-center 
                          bg-neutral-100 rounded-md w-11/12
                        "
                        >
                          <D3Plot index={i} />
                          <PlotVectors
                            vectors={vectors}
                            plotIndex={i}
                            key={i}
                          />
                        </aside>
                      </aside>
                    </ArcherElement>
                  </div>
                  {i === 0 || i !== stateVecArr.vectorArr.length - 1 ? (
                    <TransformationBar numtest={i + 1} />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </ArcherContainer>
      </section>

      <section
        id={styles.rightsection}
        className="h-full flex items-start flex-col"
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

        {/* <div
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
          <button
            onClick={handleResetList}
            className="
              rounded-full h-12 w-12 
              
              bg-gray-50 bg-opacity-75 border border-gray-200 
            "
          >
            <Trash className="text-gray-700" />
          </button>
        </div> */}
      </section>
    </main>
  );
};

export default MainSectionPlotPage;
