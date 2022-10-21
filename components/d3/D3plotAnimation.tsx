import * as d3 from "d3";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CornerUpLeft, Pause, Play, RotateCcw } from "react-feather";
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

  const handleProgressBar = (event: any) => {
    event.preventDefault();
    // console.log(event.target.value);
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
          // step={0.01}
          onChange={handleProgressBar}
        />
      </section>
    </>
  );
};

export default D3PlotAnimation;
