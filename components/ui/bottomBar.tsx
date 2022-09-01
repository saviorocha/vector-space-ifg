import React from "react";
import RenderTex from "../tex/renderTex";

const BottomBar = () => {
  return (
    <nav
      id="bottom-bar"
      className="
        fixed bottom-0 w-full h-36 
        flex items-center justify-center 
        bg-gray-100 rounded-tr-3xl rounded-tl-3xl shadow-md
        border border-gray-400
      "
    >
      <section
        id="information-box"
        className="
          w-7/12 h-4/5 rounded-md
          flex flex-row
          bg-white border border-gray-400
          text-sm shadow-md
        "
      >
        <aside
          className="w-1/2 h-full flex-col flex justify-around items-center"
          style={{
            borderRight: "1px solid #c0c0c0",
          }}
        >
          <p>Transformação</p>
          <div>
            <RenderTex
              mathExpression={"T_1\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}"}
            />
            <RenderTex
              mathExpression={String.raw`
              T_{1}(\mathbf{a,b}) = \begin{bmatrix}
              -k & 0\\
              0 & k
         \end{bmatrix}\begin{bmatrix}
              a\\
              b
         \end{bmatrix}=\begin{bmatrix}
              -ka\\
              kb
         \end{bmatrix}
            `}
            />
          </div>
        </aside>

        <aside className="w-1/2 h-full flex flex-col justify-around items-center">
          <p>Vetores</p>
          <div>
            <RenderTex mathExpression={"T_1(v_1)=(1,1)"} />
            <RenderTex mathExpression={"T_1(e_1)=(1,1)"} />
            <RenderTex mathExpression={"T_1(e_2)=(1,1)"} />
          </div>
        </aside>
      </section>
    </nav>
  );
};

export default BottomBar;
