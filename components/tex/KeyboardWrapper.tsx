import React, { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "katex/dist/katex.min.css";

interface IProps {
  onChange: (input: string) => void;
  // @ts-ignore
  keyboardRef: MutableRefObject<Keyboard>;

}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
}) => {
  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
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
          "1 2 3 × □² □³",
          "4 5 6 / yˣ π",
          "7 8 9 - √ log",
          "{shift} teste",
        ],
        shift: [
          "` 2 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} q w e r t y u i o p [ ] \\",
          "{lock} a s d f g h j k l ; ' {enter}",
          "{shift} z x c v b n m , . / {shift}",
          ".com @ {space}",
        ],
      }}
    />
  );
};

export default KeyboardWrapper;
