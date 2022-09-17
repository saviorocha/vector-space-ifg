import React, { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "katex/dist/katex.min.css";
import { IKeyboardProps } from "../../interfaces/interfaces";

const KeyboardWrapper: FunctionComponent<IKeyboardProps> = ({
  onChange,
  keyboardRef,
}) => {
  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
    // if (button === "{lock}") {
    //   setLayoutName(layoutName === "default" ? "lock" : "default");
    // }
  };

  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={onKeyPress}
      // onRender={() => console.log("Rendered")}
      layout={{
        default: [
          "1 2 3 × ² ³",
          "4 5 6 / e π",
          "7 8 9 - √ log",
          ", 0 . % ( )",
          "{shift} {bksp} {arrowleft} {arrowright}",
        ],
        shift: [
          "₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ - = {bksp}",
          "{tab} q w e r t y u i o p ",
          "{lock} a s d f g h j k l {enter}",
          "{shift} z x c v b n m , . / ",
          "@ {space}",
        ],
        // lock: [
        //   "□₀ □₁ □₂ □₃ □₄ □₅ □₆ □₇ □₈ □₉ - {bksp}",
        //   "{tab} Q W E R T Y U I O P ",
        //   "{lock} A S D F G H J K L {enter}",
        //   "{shift} Z X C V B N M , . / ",
        //   "@ {space}",
        // ]
      }}
    />
  );
};

export default KeyboardWrapper;
