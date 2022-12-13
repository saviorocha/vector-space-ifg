import React, { FunctionComponent, useEffect, useState } from "react";
import { ITransformationFormProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/ui/vectorbox.module.css";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useTheme } from "next-themes";

/**
 * Form for creating linear transformation by its matrix
 */
const TransformationForm: FunctionComponent<ITransformationFormProps> = ({
  onSubmit,
  matrixArr = [1, 0, 0, 1],
}) => {
  const [focus, setFocus] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* <InlineMath
          math={String.raw`
      \Biggr[
    `}
        /> */}
        {[matrixArr[0], matrixArr[2], matrixArr[1], matrixArr[3]].map(
          (el, i) => {
            return (
              <React.Fragment key={i}>
                <input
                  onBlur={() => {
                    setFocus(false);
                  }}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  className={styles.inptrn}
                  style={{
                    color: theme === "dark" ? "#fff" : "#000",
                  }}
                  // type="number"
                  id={`t${i}`}
                  defaultValue={el}
                />
                {i === 1 && <br />}
              </React.Fragment>
            );
          }
        )}
        {/* <InlineMath
          math={String.raw`
      \Biggr]
    `}
        /> */}

        <br />
        <div className={styles.submit}>
          <input className={styles.inptrn} type="text" id="name" name="name" />

          <button
            className="border-2 border-slate-400 rounded-md w-14"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default TransformationForm;
