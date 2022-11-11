import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useListContext } from "../../../context";
import { IMainSectionProps } from "../../../interfaces/interfaces";
import stylesplot from "../../../styles/modules/pages/editartransformacoes.module.css";
import D3Plot from "../../d3/D3plot";
import RenderTex from "../../tex/RenderTex";
import ConfigPopup from "../../ui/inputs/ConfigPopup";
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
  const { theme } = useTheme();
  const { stateVecArr } = useListContext();
  const [trnNum, setTrnNum] = useState(stateVecArr.vectorArr.length);
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
      id={stylesplot.main}
      style={mainStyle}
    >
      <section
        id={stylesplot.leftsection}
        className="h-full flex items-center justify-around flex-col"
      >
        {children}
      </section>

      <section
        id={stylesplot.middlesection}
        // className="h-full flex items-center justify-center"
        className={`
          relative gap-1 overflow-x-scroll overflow-y-hidden
          flex items-center justify-${trnNum > 1 ? "start" : "around"} flex-row 
        `}
        // h-full overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0
      >
        <ArcherContainer>
          <div
            className={`flex flex-row items-center mb-20`} // mb-20
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
                                style: {
                                  strokeColor:
                                    theme === "dark" ? "white" : "black",
                                  strokeWidth: 1,
                                },
                                label: (
                                  <RenderTex
                                    mathExpression={`${
                                      stateVecArr.transformationArr[i + 1].name
                                    }`}
                                    classStyle={stylesplot.transformationarrow}
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
                            bg-neutral-100 dark:bg-black
                            rounded-md w-11/12
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
                    <TransformationBar transformationNum={i + 1} />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </ArcherContainer>
      </section>

      <section
        id={stylesplot.rightsection}
        className="h-screen flex items-start flex-col"
      >
        <ConfigPopup />
      </section>
    </main>
  );
};

export default MainSectionPlotPage;
