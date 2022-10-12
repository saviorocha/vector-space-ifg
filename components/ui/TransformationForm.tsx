import React, { FunctionComponent } from "react";
import { ITransformationFormProps } from "../../interfaces/interfaces";

const TransformationForm: FunctionComponent<ITransformationFormProps> = ({
  onSubmit,
  updateOrCreate,
  matrixArr,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {[matrixArr[0], matrixArr[2], matrixArr[1], matrixArr[3]].map((el, i) => {
        return (
          <>
            <input
              key={i}
              className="border-2 border-slate-400 w-10"
              type="text"
              id={`t${i}`}
              defaultValue={updateOrCreate === "create" ? 0 : el}
            />
            {i === 1 && <br key={i + 1} />}
          </>
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
