import React from "react";
import { useListContext } from "../../context";
import D3Plot from "../d3/D3plot";

const Carousel = () => {
  const { list, stateVecArr } = useListContext();

  return (
    <div>
      {stateVecArr.map((vec, i) => {
        return <D3Plot key={i} index={i} />;
      })}
    </div>
  );
};

export default Carousel;
