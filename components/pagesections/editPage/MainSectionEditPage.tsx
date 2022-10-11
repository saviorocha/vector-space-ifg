import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { FunctionComponent, useState } from "react";
import {
  Globe,
  Hash,
  Play,
  Settings,
  ZoomIn,
  ZoomOut
} from "react-feather";
import { useListContext, useNameContext } from "../../../context";
import { IMainSectionProps } from "../../../interfaces/interfaces";
import styles from "../../../styles/modules/editpage.module.css";
import D3Plot from "../../d3/D3plot";
import Carousel, { CarouselItem } from "../../ui/Carousel";

import RoundButton from "../../ui/RoundButton";
import TransitionButton from "../../ui/TransitionButton";

const btnClassName = `rounded-full h-10 w-10 right-0
flex items-center justify-center 
bg-gray-50 bg-opacity-75 border border-gray-200`

const MainSectionEditPage: FunctionComponent<IMainSectionProps> = ({
  mainStyle,
  mainRef,
  children,
}) => {
  const {
    currentPlot,
    setCurrentPlot,
    vectorNameCounter,
    setVectorNameCounter,
  } = useNameContext();
  const { list, stateVecArr } = useListContext();
  const [mode, setMode] = useState<Mode>("dark");
  // const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());

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
        </section>

        <section
          id={styles.middlesection}
          // className="h-full flex items-center justify-center"
          className="
            relative gap-1 overflow-hidden
            flex items-center justify-center flex-col 
          "
          // h-full overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0
        >
          <Carousel>
            {stateVecArr.vectorArr.map((vec, i) => {
              return (
                <CarouselItem key={i}>
                  <D3Plot index={i} />
                </CarouselItem>
              );
            })}
          </Carousel>
        </section>

        <section
          id={styles.rightsection}
          className="h-full flex items-center justify-between flex-col"
        >
          {/* <button id="counter" onClick={() => {
            setVectorNameCounter(vectorNameCounter + 1);
            console.log("vectorNameCounter", vectorNameCounter);
          }}>
            <Hash />
          </button> */}
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

          <div
            id="bottom-buttons"
            className="flex items-center justify-center flex-col"
          >
            <RoundButton
              classString={btnClassName}
              icon={<ZoomIn className="text-gray-700" />}
            />
            <RoundButton
              classString={btnClassName}
              icon={<ZoomOut className="text-gray-700" />}
            />
            <RoundButton
              classString={btnClassName}
              icon={<Play className="text-gray-700" />}
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

export default MainSectionEditPage;
