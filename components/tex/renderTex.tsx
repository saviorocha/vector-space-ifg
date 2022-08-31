import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";

const RenderTex = ({mathExpression}) => {
  const [expression, setExpression] = useState("");
  const [showTex, setShowTex] = useState(true);

  useEffect(()=> {
    setExpression(mathExpression);
  },[])

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
    <div>
      {showTex ? (
        <p onClick={handleDoubleClick}>
          <InlineMath math={expression} />
        </p>
      ) : (
        <textarea
          onKeyDown={handleKey}
          onChange={handleOnChange}
          value={expression}
        />
      )}
    </div>
  );
};

export default RenderTex;
