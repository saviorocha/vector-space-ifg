import { Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { X } from "react-feather";
import { useListContext } from "../../../context";
import useListEvents from "../../../hooks/useListEvents";
import InfoBox from "../../ui/dataDisplay/InfoBox";
import TransformationForm from "../../ui/inputs/TransformationForm";
import PlotTransformation from "./PlotTransformation";

const TransformationBar = ({ transformationNum = 0 }) => {
  const [toggleTrnInput, setToggleTrnInput] = useState<boolean>(false);
  const [hideAlert, setHideAlert] = useState(true);
  const { transformationSubmitHandler } = useListEvents();
  const { stateVecArr } = useListContext();
  const [transformation, setTransformation] = useState(
    stateVecArr.transformationArr[0]
  );

  const handleTransfromationSubmit = (event: any) => {
    const created = transformationSubmitHandler(event, transformation);
    // console.log("fjalfaj");

    setHideAlert(created);
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
      {stateVecArr.transformationArr.length > 1 ? (
        <div>
          <PlotTransformation
            transformation={stateVecArr.transformationArr[transformationNum]}
            trnIndex={transformationNum}
          />
          {toggleTrnInput && (
            <TransformationForm onSubmit={handleTransfromationSubmit} />
          )}
        </div>
      ) : (
        <div>
          {toggleTrnInput ? (
            <TransformationForm onSubmit={handleTransfromationSubmit} />
          ) : (
            <button
              onClick={() => {
                setToggleTrnInput(true);
              }}
            >
              Adicionar Transformação
            </button>
          )}
        </div>
      )}
      {!hideAlert && (
        <Alert
          severity="error"
          className="absolute mx-0 top-0"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setHideAlert(true);
              }}
            >
              <X />
            </Button>
          }
        >
          Expressão inválida! Tente novamente.
        </Alert>
      )}
    </section>
  );
};

export default TransformationBar;
