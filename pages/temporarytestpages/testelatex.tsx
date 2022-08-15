import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
const TesteLatex = () => {
  const inlineFormula = "\\cos (2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta";
  const blockFormula = `\\frac{n!}{k!(n-k)!} = \\binom{n}{k}`;
  return (
    <div style={{ padding: 50 }}>
      <div>
        <p>
          Inline formula:{" "}
          <InlineMath
            math={inlineFormula}
            errorColor={"#cc0000"}
            renderError={(error) => {
              return <b>Fail: {error.name}</b>;
            }}
          />
        </p>
        <hr></hr>
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
