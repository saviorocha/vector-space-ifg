import React, { useEffect, useState } from "react";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import InfoBox from "../../ui/InfoBox";
import TransformationForm from "../../ui/TransformationForm";
import PlotTransformation from "./PlotTransformation";

const TransformationBar = ({ transformationNum = 0 }) => {
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const { transformationSubmitHandler } = useListEvents();
  const { stateVecArr } = useListContext();
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );

  const handleTransfromationSubmit = (event: any) => {
    transformationSubmitHandler(event, transformation);
    setToggleTrnInput(false);
  };

  useEffect(() => {
    setTransformation(
      stateVecArr.transformationArr[stateVecArr.transformationArr.length - 1]
    );
  }, [stateVecArr]);

  useEffect(() => {
    // console.log("transformation", transformation);
  }, []);

  return (
    <section
      id="transformation-box"
      className={`mt-3 ${
        stateVecArr.transformationArr.length > 1 ? "self-end" : ""
      }`}
    >
      {stateVecArr.transformationArr.length > 1 ? (
        <InfoBox customStyles="w-60 h-32">
          <PlotTransformation
            transformation={stateVecArr.transformationArr[transformationNum]}
            trnIndex={transformationNum}
          />
          {toggleTrnInput && (
            <TransformationForm onSubmit={handleTransfromationSubmit} />
          )}
        </InfoBox>
      ) : (
        <InfoBox customStyles="w-32 h-24">
          {toggleTrnInput ? (
            <TransformationForm onSubmit={handleTransfromationSubmit} />
          ) : (
            <button
              onClick={() => {
                setToggleTrnInput(true);
              }}
            >
              Adicionar transformação
            </button>
          )}
        </InfoBox>
      )}
    </section>
  );
};

export default TransformationBar;
