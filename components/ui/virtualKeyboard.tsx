import React, { ChangeEvent, useRef, useState } from "react";
import KeyboardWrapper from "../tex/KeyboardWrapper";

const VirtualKeyboard = () => {
  const [input, setInput] = useState("");
  const keyboard = useRef(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
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
    <>
      <KeyboardWrapper keyboardRef={keyboard} onChange={handleKeyboardChange} />
      <input value={input} onChange={(e) => onChangeInput(e)} />
    </>
  );
};

export default VirtualKeyboard;
