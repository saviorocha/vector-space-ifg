import "katex/dist/katex.min.css";
import { useTheme } from "next-themes";
import React, { FunctionComponent, useState } from "react";
import { InlineMath } from "react-katex";
import { ITransformationFormProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/ui/vectorbox.module.css";

/**
 * Form for creating linear transformation by its matrix
 */
const TransformationForm: FunctionComponent<ITransformationFormProps> = ({
  onSubmit,
  matrixArr = [1, 0, 0, 1],
  transformationName = "",
}) => {
  const { theme } = useTheme();

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-row justify-center">
          <InlineMath math={String.raw`\Biggr[`} />
          <div className="mt-1">
            {[matrixArr[0], matrixArr[2], matrixArr[1], matrixArr[3]].map(
              (el, i) => {
                return (
                  <React.Fragment key={i}>
                    <input
                      className={styles.inptrn}
                      style={{
                        backgroundColor: theme === "dark" ? "#18181b" : "#fff",
                        color: theme === "dark" ? "#fff" : "#000",
                        border:
                          theme === "dark"
                            ? "0.5px solid #282828"
                            : "0.5px solid #d8d8d8",
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
          </div>
          <InlineMath math={String.raw`\Biggr]`} />
        </div>
        <div className={styles.submit}>
          <input
            className={styles.inptrnname}
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            defaultValue={transformationName}
          />
          <button
            className="border border-slate-400 dark:border-slate-500 rounded-sm w-14 ml-1 text-sm"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default TransformationForm;
