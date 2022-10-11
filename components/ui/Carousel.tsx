import React, { FunctionComponent, useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import { useListContext, useNameContext } from "../../context";
import { PropsChildren } from "../../interfaces/interfaces";

import styles from "../../styles/modules/carousel.module.css";
import RoundButton from "./RoundButton";

const btnString = 
`rounded-full h-10 w-10 right-0 mx-10
flex items-center justify-center 
bg-gray-50 bg-opacity-75 border border-gray-200`;

export const CarouselItem: FunctionComponent<PropsChildren> = ({
  children,
}) => {
  return <aside className={styles.carouselitem}>{children}</aside>;
};

const Carousel: FunctionComponent<PropsChildren> = ({ children }) => {
  const { currentPlot, setCurrentPlot } = useNameContext();
  const { stateVecArr } = useListContext();

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }

    setCurrentPlot(newIndex);
  };

  useEffect(() => {
    // console.log("stateVecArr", stateVecArr)
    // console.log("currentPlot", currentPlot)
  }, [currentPlot]);

  return (
    <section className="carousel overflow-hidden">
      <section
        className={styles.inner}
        style={{ transform: `translateX(-${currentPlot * 100}%)` }}
      >
        {React.Children.map(children, (child: any, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </section>
      <aside className={styles.indicators}>
        <RoundButton
          classString={btnString}
          icon={<ChevronsLeft className="text-gray-700" />}
          handleOnClick={() => {
            updateIndex(currentPlot - 1);
          }}
          disabled={currentPlot - 1 < 0}
        />
        <aside>
          {React.Children.map(children, (child, index) => {
            return (
              <span
                className={styles.dot}
                style={{
                  backgroundColor: index === currentPlot ? "#717171" : "#bbb",
                }}
                onClick={() => {
                  updateIndex(index);
                }}
              ></span>
            );
          })}
        </aside>
        <RoundButton
          classString={btnString}
          icon={<ChevronsRight className="text-gray-700" />}
          handleOnClick={() => {
            updateIndex(currentPlot + 1);
          }}
          disabled={currentPlot + 1 > stateVecArr.transformationArr.length - 1}
        />
      </aside>
    </section>
  );
};

export default Carousel;
