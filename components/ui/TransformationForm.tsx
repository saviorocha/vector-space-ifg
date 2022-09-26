import React from "react";

const TransformationForm = ({ onSubmit, updateOrCreate, matrixArr }) => {
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
            {i === 1 ? <br key={i + 1} /> : null}
          </>
        );
      })}
      {/* <input
     className="border-2 border-slate-400 w-10"
     type="text"
     id="t00"
     defaultValue={0}
   />
   <input
     className="border-2 border-slate-400 w-10"
     type="text"
     id="t01"
     defaultValue={0}
   />
   <br />
   <input
     className="border-2 border-slate-400 w-10"
     type="text"
     id="t10"
     defaultValue={0}
   />
   <input
     className="border-2 border-slate-400 w-10"
     type="text"
     id="t11"
     defaultValue={0}
   /> */}
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
