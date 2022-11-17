import { Tooltip } from "@mui/material";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "react-feather";
import { useD3Context, useListContext } from "../../context";
import { useConfigContext } from "../../context/ConfigContext";
import useTexStr from "../../hooks/useTexStr";
import styles from "../../styles/modules/pages/animation.module.css";
import RenderTex from "../tex/RenderTex";
import InfoBox from "../ui/dataDisplay/InfoBox";
import AnimationPlotComponent from "./animationPlotComponent";

const D3PlotAnimation = () => {
  const barRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef();
  const [state, setState] = useState("init");
  const [countDown, setCountdown] = useState(0);
  const refElement = useRef<null | HTMLDivElement>(null);
  // const [vectors, setVectors] = useState();
  const [d3Component, setD3Component] = useState<AnimationPlotComponent>(
    {} as AnimationPlotComponent
  );

  const { hideNumbers, showBasisVectors } = useConfigContext();
  const { matrixStrings } = useTexStr();
  const { dimension } = useD3Context();
  const { stateVecArr } = useListContext();

  const teste = (event: any) => {
    event.preventDefault();
    const vecArr = stateVecArr.vectorArr;
    const maxInput = 100;
    const trnNumber = stateVecArr.transformationArr.length - 1;
    const range = maxInput / trnNumber;

    // console.log(stateVecArr.vectorArr);

    let scales = [];
    for (let i = 0; i < trnNumber; i++) {
      scales.push(d3.scaleLinear().range([i * range, range + i * range]));
    }

    /**
     * [1,3]
     * _____ [domain([1,2]), domain([2,4])]
     * [2,6]
     * _____ [domain([3,6]), domain([6,12])]
     * [4,12]
     */
    for (let i = 0; i < trnNumber; i++) {
      console.log("-------------");
      for (let j = 0; j < vecArr[0].length - 1; j++) {
        console.log("_____________");

        // prettier-ignore
        console.log(
          vecArr[i][j].x, vecArr[i + 1][j].x,
        );
        // prettier-ignore
        console.log(
          vecArr[i][j].y, vecArr[i + 1][j].y
        );
        // d3.scaleLinear().domain([vecArr[i][j].x, vecArr[i + 1][j].x]);
        // d3.scaleLinear().domain([vecArr[i][j].y, vecArr[i + 1][j].y]);
      }
    }

    // // _______________
    // d3.scaleLinear().domain([vecArr[0][0].x, vecArr[1][0].x]);
    // d3.scaleLinear().domain([vecArr[0][0].y, vecArr[1][0].y]);
    // // _______________
    // d3.scaleLinear().domain([vecArr[1][0].x, vecArr[2][0].x])
    // d3.scaleLinear().domain([vecArr[1][0].y, vecArr[2][0].y])

    // vecArr.map((vectors, i) => {
    //   console.log("_____");
    //   vectors.map((vec, j) => {
    //     console.log(vecArr[i][j].name, vecArr[i][j].x, vecArr[i][j].y);
    //     d3.scaleLinear().domain([vecArr[i][j].x, vecArr[i][j + 1].x]);
    //     d3.scaleLinear().domain([vecArr[i][j].y, vecArr[i][j + 1].y]);
    //     // console.log(vec.x, vec.y)
    //   });
    // });
    // criar novo conjunto de vetores (um "novo stateVecArr") específico para aquele momento da barra de progresso
    // chamar função updateData()
  };

  const time = () => {
    setCountdown((countDown: any) => {
      if (countDown < 100) {
        return countDown + 1;
      }
      if (countDown === 100) {
        setIsPlaying(false);
        return countDown;
      }
    });
  };

  const vectors = (index: number) => {
    let vectorsMap = stateVecArr.vectorArr[index];
    if (!showBasisVectors) {
      // filter out the basis vectors
      vectorsMap = vectorsMap.filter((vector) => {
        return !vector.isBasisVector;
      });
    }

    return vectorsMap.map((vector) => {
      return vector.d3VectorFormat();
    });
  };

  const handleProgressBar = (event: any) => {
    // console.log(event.target.value);
    event.preventDefault();
  };

  const handlePlayAnimation = () => {
    if (stateVecArr.transformationArr.length < 2) {
      alert("Nenhuma transformação adicionada ainda!");
      return;
    }

    setIsPlaying(true);
    let run = 1;
    const interval = setInterval(() => {
      d3Component.updateData(vectors(run));
      run++;
      if (run === stateVecArr.transformationArr.length) {
        clearInterval(interval);
      }
    }, 2000);
  };

  const handlePauseAnimation = () => {
    setIsPlaying(false);
    d3.selectAll(".lineVector").transition().duration(0);
  };

  const createPlane = () => {
    // @ts-ignore
    barRef.current.value = 0;
    setCountdown(0);
    setIsPlaying(false);
    d3.select(refElement.current).selectAll("*").remove();

    setD3Component(
      new AnimationPlotComponent(
        refElement.current,
        dimension,
        hideNumbers,
        vectors(0)
      )
    );
  };

  useEffect(createPlane, [stateVecArr, hideNumbers, showBasisVectors]);

  useEffect(() => {
    if (isPlaying) {
      // @ts-ignore
      intervalRef.current = setInterval(
        time,
        30 * (stateVecArr.transformationArr.length - 1)
      );
    }
    if (!isPlaying) {
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    // @ts-ignore
    barRef.current.value = countDown;
  }, [countDown]);

  return (
    <>
      <div className={styles.plotcontainer}>
        <section id={styles.plot} ref={refElement}></section>
        <InfoBox customStyles="h-32" flexDirection="row">
          {stateVecArr.transformationArr.length > 1 ? (
            stateVecArr.transformationArr.map((trn, i) => {
              if (i !== 0) {
                return (
                  <React.Fragment key={i}>
                    <RenderTex mathExpression={matrixStrings(i)[0]} />
                    {i < stateVecArr.transformationArr.length - 1 ? (
                      <RenderTex
                        mathExpression={String.raw`\longrightarrow`}
                        classStyle="m-5"
                      />
                    ) : null}
                  </React.Fragment>
                );
              }
            })
          ) : (
            <div>Nenhuma transformação adicionada ainda!</div>
          )}
        </InfoBox>
      </div>
      <section className={styles.playercontainer}>
        <section className={styles.btncontainer}>
          <Tooltip title="Reiniciar transformação">
            <button className={styles.playerbtn} onClick={createPlane}>
              <RotateCcw />
            </button>
          </Tooltip>
          {isPlaying ? (
            <Tooltip title="Pausar">
              <button
                className={styles.playerbtn}
                onClick={handlePauseAnimation}
              >
                <Pause />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Reproduzir">
              <button
                className={styles.playerbtn}
                onClick={handlePlayAnimation}
              >
                <Play />
              </button>
            </Tooltip>
          )}
        </section>
        <input
          className={styles.playerbar}
          disabled
          ref={barRef}
          type="range"
          min="0"
          max="100"
          defaultValue={0}
          // step={0.01}
          onChange={handleProgressBar}
        />
      </section>
      {/* <button
        className={styles.playerbtn}
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        teste
      </button>
      <div>count: {countDown}</div> */}
    </>
  );
};

export default D3PlotAnimation;
