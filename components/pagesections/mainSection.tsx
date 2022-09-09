import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { FunctionComponent, useEffect, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Globe,
  Hash,
  Play,
  Settings,
  ZoomIn,
  ZoomOut,
} from "react-feather";
import Vector from "../../classes/vector";
import { useListContext } from "../../context";
import { IMainSectionProps } from "../../interfaces/interfaces";
import styles from "../../styles/modules/editpage.module.css";
import D3Plot from "../d3/D3plot";
import RoundButton from "../ui/RoundButton";
import TransitionButton from "../ui/TransitionButton";

const MainSection: FunctionComponent<IMainSectionProps> = ({
  mainStyle,
  mainRef,
  children,
}) => {
  const { list, stateVecArr } = useListContext();
  const [mode, setMode] = useState<Mode>("dark");
  // const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());

  const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const dimensions: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };


  useEffect(() => {
    // const newHead = addTransformation(new Transformation([2, 0], [0, 2]));
    // const newList = new StateList(newHead);
    // console.log("mainRef", mainRef);
    // setList(newList);
    // setStateVecArr(list.toArray());
    // console.log("lista mudou no main")
    // console.log("mainsectionArr", stateVecArr);
    // console.log("mainsectionList", list);
  }, [list]);

  useEffect(() => {
    // console.log("mainsectionArr", stateVecArr);
  }, [stateVecArr]);

  return (
    <>
      <main
        className="
          mx-auto absolute h-3/4 right-0
          flex justify-center items-center
        "
        id={styles.main}
        style={mainStyle}
        ref={mainRef}
      >
        <section
          id={styles.leftsection}
          className="h-full flex items-center justify-around flex-col"
        >
          {children}
          <RoundButton
            icon={<ChevronsLeft className="text-gray-700" />}
            left="left-0"
          />
          <RoundButton
            icon={<ChevronsLeft className="text-gray-700" />}
            left="left-0"
          />
        </section>

        <section
          id={styles.middlesection}
          className="h-full flex items-center justify-center"
        >
          {stateVecArr.map((vec, i) => {
            return (
              <D3Plot key={i} index={i} />
            );
          })}
        </section>

        <section
          id={styles.rightsection}
          className="h-full flex items-center justify-between flex-col"
        >
          <TransitionButton
            icon={<Settings className="text-gray-700 w-7 h-7" />}
            sectionStyle={styles.settings}
            buttonStyle="z-10"
            transitionStyles={{
              entering: { opacity: 0 },
              entered: { opacity: 1 },
              exiting: { opacity: 1 },
              exited: { opacity: 0 },
            }}
          >
            <ul className="mt-3 ">
              <li className="flex items-center justify-start ml-2 p-1 ">
                <DarkModeToggle
                  mode={mode}
                  size="sm"
                  inactiveTrackColor="#e2e8f0"
                  inactiveTrackColorOnHover="#f8fafc"
                  inactiveTrackColorOnActive="#cbd5e1"
                  activeTrackColor="#334155"
                  activeTrackColorOnHover="#1e293b"
                  activeTrackColorOnActive="#0f172a"
                  inactiveThumbColor="#1e293b"
                  activeThumbColor="#e2e8f0"
                  onChange={(mode) => {
                    setMode(mode);
                  }}
                />
                Tema
              </li>
              <li className="flex items-center justify-start ml-2 p-1 ">
                <Globe />
                Grid
              </li>
              <li className="flex items-center justify-start ml-2 p-1 ">
                <Hash />
                Mostrar números
              </li>
            </ul>
          </TransitionButton>
          <RoundButton
            icon={<ChevronsRight className="text-gray-700" />}
            right="right-0"
          />
          <div
            id="bottom-buttons"
            className="flex items-center justify-center flex-col"
          >
            <RoundButton
              icon={<ZoomIn className="text-gray-700" />}
              right="right-0"
            />
            <RoundButton
              icon={<ZoomOut className="text-gray-700" />}
              right="right-0"
            />
            <RoundButton
              icon={<Play className="text-gray-700" />}
              right="right-0"
            />
            {/* <button
            onClick={handleResetList}
            className="
              rounded-full h-12 w-12 
              
              bg-gray-50 bg-opacity-75 border border-gray-200 
            "
          >
            <Trash className="text-gray-700" />
          </button> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default MainSection;
