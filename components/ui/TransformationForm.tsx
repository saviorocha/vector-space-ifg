import React, { FunctionComponent } from "react";
import { ITransformationFormProps } from "../../interfaces/interfaces";

const TransformationForm: FunctionComponent<ITransformationFormProps> = ({
  onSubmit,
  matrixArr = [1, 0, 0, 1],
}) => {
  return (
    <form onSubmit={onSubmit}>
      {[matrixArr[0], matrixArr[2], matrixArr[1], matrixArr[3]].map((el, i) => {
        return (
          <React.Fragment key={i}>
            <input
              className="border-2 border-slate-400 w-10"
              // type="number"
              id={`t${i}`}
              defaultValue={el}
            />
            {i === 1 && <br />}
          </React.Fragment>
        );
      })}

      <br />
      <input
        className="border-2 border-slate-400 w-10"
        type="text"
        id="name"
        name="name"
      />

      <button
        className="border-2 border-slate-400 rounded-md w-14"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default TransformationForm;
