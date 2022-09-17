import React, { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import KeyboardWrapper from "../../components/tex/KeyboardWrapper";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const TestKeyboard: FunctionComponent = () => {
  const [input, setInput] = useState("");
  const [showTex, setShowTex] = useState(true);
  const keyboard = useRef(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const handleKey = (event: any) => {
    if (event.key === "Enter") {
      setInput(event.target.value);
      setShowTex(true);
    }
  };
  const handleDoubleClick = (event: any) => {
    if (event.detail === 2) {
      setShowTex(false);
    }
  };

  const handleKeyboardChange = (input: string) => {
    if (input.includes("teste")) {
      input = input.replace(
        "teste",
        String.raw`T\colon \mathbb{R}^{2} \to \mathbb{R}^{2}`
      );
    }
    setInput(input);
  };

  return (
    <div>
      {showTex ? (
        <p onClick={handleDoubleClick}>
          <InlineMath math={input} />
        </p>
      ) : (
        <input
          value={input}
          onKeyDown={handleKey}
          onChange={(e) => onChangeInput(e)}
        />
      )}
      <KeyboardWrapper keyboardRef={keyboard} onChange={handleKeyboardChange} />
    </div>
  );
};

export default TestKeyboard;
