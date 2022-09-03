import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useState } from "react";
import RenderTex from "../../components/tex/RenderTex";
const TesteLatex = () => {
  const [expression, setExpression] = useState(
    "T\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}"
  );
  const [showTex, setShowTex] = useState(true);
  const inlineFormula = "\\cos (2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta";
  const blockFormula = `\\frac{n!}{k!(n-k)!} = \\binom{n}{k}`;

  const handleOnChange = (event: any) => {
    setExpression(event.target.value);
  };

  const handleKey = (event: any) => {
    if (event.key === "Enter") {
      setExpression(event.target.value);
      setShowTex(true);
    }
  };

  const handleDoubleClick = (event: any) => {
    if (event.detail === 2) {
      setShowTex(false);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <RenderTex mathExpression={"T\\colon \\mathbb{R}^{2} \\to \\mathbb{R}^{2}"} />
      <hr />
      <div>
        <hr />
        <p>Block formula:</p>
        <BlockMath math={blockFormula} errorColor={"#cc0000"} /> <hr />
        <BlockMath>{String.raw`\frac{\text{m}}{\text{s}^2}`}</BlockMath> <hr />
        <BlockMath math={"T(a,b)=(a-2b,\\frac{a+b}{2})"} />
        <BlockMath
          math={String.raw`A\vec{u_1} = \begin{bmatrix}1&1\\2&2 \end{bmatrix}\begin{bmatrix}1\\2 \end{bmatrix}  `}
        />
        <BlockMath
          math={String.raw`T\colon \mathbb{R}^{2} \to \mathbb{R}^{2}`}
        />
        <BlockMath
          math={String.raw`
          \begin{bmatrix}
          a\\
          b
     \end{bmatrix} \longmapsto \begin{bmatrix}
          1 & -1\\
          1 &  1
     \end{bmatrix}\begin{bmatrix}
          a\\
          b
     \end{bmatrix} `}
        />
      </div>
      <BlockMath
        math={String.raw`
          (T_{1} \circ T_{2})(\mathbf{u}) = A_{1}A_{2}\mathbf{u} = \begin{bmatrix}
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
  );
};

export default TesteLatex;
