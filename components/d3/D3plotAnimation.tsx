import * as d3 from "d3";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CornerUpLeft, Pause, Play, RotateCcw } from "react-feather";
import Vector from "../../classes/vector";
import { useD3Context, useListContext } from "../../context";
import styles from "../../styles/modules/D3.module.css";
import AnimationPlotComponent from "./animationPlotComponent";

const D3PlotAnimation = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const refElement = useRef<null | HTMLDivElement>(null);
  const [d3Component, setD3Component] = useState<AnimationPlotComponent>(
    {} as AnimationPlotComponent
  );

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
      // console.log(i);
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
      console.log("-------------")
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

  const handleProgressBar = (event: any) => {
    // console.log(event.target.value);
    event.preventDefault();
  };

  const handlePlayAnimation = () => {
    setIsPlaying(true);
    let run = 1;
    const interval = setInterval(() => {
      d3Component.updateData(
        stateVecArr.vectorArr[run].map((state) => {
          return state.d3VectorFormat();
        })
      );
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
    setIsPlaying(false);
    d3.select(refElement.current).selectAll("*").remove();

    setD3Component(
      new AnimationPlotComponent(
        refElement.current,
        dimension,
        stateVecArr.vectorArr[0].map((state) => {
          return state.d3VectorFormat();
        })
      )
    );
  };

  useEffect(createPlane, []);

  return (
    <>
      <section id={styles.plot} ref={refElement}></section>
      <section className="flex items-center justify-center">
        <button
          onClick={() => {
            router.push("/editplane");
          }}
        >
          <CornerUpLeft />
        </button>
        <button onClick={createPlane}>
          <RotateCcw />
        </button>
        {isPlaying ? (
          <button onClick={handlePauseAnimation}>
            <Pause />
          </button>
        ) : (
          <button onClick={handlePlayAnimation}>
            <Play />
          </button>
        )}
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={0}
          // step={0.01}
          onChange={handleProgressBar}
        />
        <button onClick={teste}>teste</button>
      </section>
    </>
  );
};

export default D3PlotAnimation;
