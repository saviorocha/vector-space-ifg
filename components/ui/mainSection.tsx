import { useEffect, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Grid,
  Hash,
  Menu,
  Settings,
  Trash,
} from "react-feather";
import StateList from "../../classes/stateList";
import StateNode from "../../classes/stateNode";
import Vector from "../../classes/vector";
import { useListContext } from "../../context";
import useList from "../../hooks/useList";
import styles from "../../styles/modules/editpage.module.css";
import D3Plot from "../d3/d3plot";
import RoundButton from "./roundButton";
import { CSSTransition } from "react-transition-group";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import { style } from "d3";
const MainSection = () => {
  const { list, setList } = useListContext();
  const { addTransformation } = useList();

  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isHighLighted, setIsHighLighted] = useState(false);
  const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());
  const [mode, setMode] = useState("dark");

  const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const dimensions: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };

  useEffect(() => {
    // const newHead = addTransformation(new Transformation([2, 0], [0, 2]));
    // const newList = new StateList(newHead);
    // console.log("newList", newList);
    // setList(newList);
    // setStateVecArr(list.toArray());
  }, []);

  function handleResetList(event: any) {
    event.preventDefault();
    setList(new StateList(new StateNode(undefined, null)));
    setStateVecArr(list.toArray());
  }

  return (
    <main
      className="container mx-auto flex justify-center items-center absolute top-0 right-0"
      id={styles.plot}
    >
      <RoundButton
        Icon={() => <Menu className="text-gray-700" />}
        left="left-0"
        top="top-0"
      />
      <RoundButton
        Icon={() => <ChevronsLeft className="text-gray-700" />}
        left="left-0"
      />
      <RoundButton
        Icon={() => <ChevronsRight className="text-gray-700" />}
        right="right-0"
      />
      <div
        id="buttons"
        className="w-24 h-24 fixed"
        style={{
          bottom: "8px",
          right: "9px",
          zIndex: "60",
        }}
      >
        <button
          onClick={handleResetList}
          className="
            absolute rounded-full h-12 w-12 
            flex items-center justify-center 
             bg-gray-50 bg-opacity-75 border border-gray-200 
            bottom-0 right-0
          "
        >
          <Trash className="text-gray-700" />
        </button>
      </div>
      {stateVecArr.map((vec, i) => {
        return (
          <D3Plot key={i} stateVectors={vec} plotDimensions={dimensions} />
        );
      })}
      {/* {isSettingsActive ? (
        <section
          id="settings"
          className="
            fixed rounded-md shadow-sm
            top-0 right-0 mr-3 mt-3 w-48 h-32
            bg-gray-50 bg-opacity-75 border border-gray-200 
          "
          // transition transition-opacity ease-in-out duration-700
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
              <Grid />
              Grid
            </li>
            <li className="flex items-center justify-start ml-2 p-1 ">
              <Hash />
              Mostrar números
            </li>
          </ul>
        </section>
      ) : null}*/}
      <CSSTransition
        in={isSettingsActive}
        timeout={400}
        classNames="list-transition"
        unmountOnExit
        appear
        onEnter={() => setIsHighLighted(!isHighLighted)}
        onExited={() => setIsHighLighted(!isHighLighted)}
      >
        <section
          className={styles.settings}
          // transition transition-opacity ease-in-out duration-700
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
              <Grid />
              Grid
            </li>
            <li className="flex items-center justify-start ml-2 p-1 ">
              <Hash />
              Mostrar números
            </li>
          </ul>
        </section>
      </CSSTransition>
      <button className="fixed top-0 right-0 mr-6 mt-6">
        <Settings
          className="text-gray-700 w-7 h-7"
          onClick={() => setIsSettingsActive(!isSettingsActive)}
        />
      </button>
    </main>
  );
};

export default MainSection;
