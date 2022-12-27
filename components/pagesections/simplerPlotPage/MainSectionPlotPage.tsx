import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { AlertCircle } from "react-feather";
import { Toaster } from "react-hot-toast";
import { useListContext } from "../../../context";
import { useIsOverflow } from "../../../hooks/useIsOverflow";
import styles from "../../../styles/modules/pages/editartransformacoes.module.css";
import D3Plot from "../../d3/D3plot";
import Logo from "../../icons/Logo";
import RenderTex from "../../tex/RenderTex";
import ConfigPopup from "../../ui/inputs/ConfigPopup";
import PlotVectors from "./PlotVectors";
import TransformationBar from "./TransformationBar";

/**
 * Central part of the edit page; it's divided in left, middle and right sections
 */
const MainSectionPlotPage = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const isOverflow = useIsOverflow(ref);

  const { theme } = useTheme();
  const { stateVecArr } = useListContext();
  const [trnNum, setTrnNum] = useState(stateVecArr.vectorArr.length);

  useEffect(() => {
    // console.log("isOverflow", isOverflow);
  }, [isOverflow]);

  useEffect(() => {
    setTrnNum(stateVecArr.vectorArr.length);
  }, [stateVecArr]);

  return (
    <main className="mx-auto flex justify-center items-center">
      <Link href="/">
        <a className={styles.logo}>
          <Logo className={styles.headerlogo} />
          <p className={styles.logotext}>VectorSpace</p>
        </a>
      </Link>

      <section
        id={styles.middlesection}
        ref={ref}
        className={`
          relative gap-1 overflow-x-scroll 
          flex items-center justify-${isOverflow ? "start" : "around"} flex-row 
        `}
      >
        <Toaster

          toastOptions={{
            // loading:
            icon: <AlertCircle />,
            duration: 3000,
            style: {
              background: "red",
              color: "white",
              fontSize: "15px"
            },
          }}
        />
        <ArcherContainer>
          <div className={`flex flex-row items-center`}>
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
                  {i !== stateVecArr.vectorArr.length - 1 && (
                    <TransformationBar transformationNum={i + 1} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </ArcherContainer>
        {/* {stateVecArr.transformationArr.length === 1 && <TransformationBar />} */}
      </section>

      <section
        id={styles.rightsection}
        className="h-screen flex items-start flex-col"
      >
        <ConfigPopup />
      </section>
    </main>
  );
};

export default MainSectionPlotPage;
