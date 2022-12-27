import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import TransformationForm from "../../ui/inputs/TransformationForm";
import PlotTransformation from "./PlotTransformation";

const TransformationBar = ({ transformationNum = 0 }) => {
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const { transformationSubmitHandler } = useListEvents();
  const { stateVecArr } = useListContext();
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );

  const handleTransfromationSubmit = (event: any) => {
    const { successful, message } = transformationSubmitHandler(
      event,
      transformation
    );

    if (!successful) {
      toast(message!);
    }

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
      className={`${
        stateVecArr.transformationArr.length > 1 ? "self-end" : ""
      }`}
    >
      <div>
        <PlotTransformation
          transformation={stateVecArr.transformationArr[transformationNum]}
          trnIndex={transformationNum}
        />
        {toggleTrnInput && (
          <TransformationForm onSubmit={handleTransfromationSubmit} />
        )}
      </div>
    </section>
  );
};

export default TransformationBar;
