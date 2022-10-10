import React, { useState } from "react";
import { useNameContext } from "../../context";

import styles from "../../styles/modules/carousel.module.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className={styles.carouselitem} style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { currentPlot, setCurrentPlot } = useNameContext();

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <section className="carousel overflow-hidden">
      <aside
        className={styles.inner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </aside>
      <aside className={styles.indicators}>
        <button
          className={styles.buttonindicators}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <span
            className={styles.dot}
              style={{
                backgroundColor: index + 1 === currentPlot ? "#717171" : "#bbb",
              }}
              onClick={() => {
                setCurrentPlot(index + 1);
                console.log("index", index);
                updateIndex(index);
              }}
            >
            </span>
          );
        })}
        <button
          className={styles.buttonindicators}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          next
        </button>
      </aside>
    </section>
  );
};

export default Carousel;
