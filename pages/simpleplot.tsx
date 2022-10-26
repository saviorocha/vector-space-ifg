import React, { LegacyRef, useRef, useState } from 'react'
import MainSectionPlotPage from "../components/pagesections/simplerPlotPage/MainSectionPlotPage" 
import SideBarEditPage from "../components/pagesections/editPage/SideBarEditPage" 
import { Transition } from "react-transition-group";
import { ChevronLeft } from 'react-feather';
import PlotTransformation from '../components/pagesections/simplerPlotPage/PlotTransformation';

// transition properties of the main component
const mainTransitionStyles: any = {
  entering: { width: "100%" },
  entered: { width: "80%" },
  exiting: { width: "80%" },
  exited: { width: "100%" },
};

// transition properties of the sidebar component
const sideBarTransitionStyles: any = {
  entering: { width: "0px", padding: "0px" },
  entered: { width: "20%" },
  exiting: { width: "20%" },
  exited: { width: "0px", padding: "0px" },
};
const SimplePlot = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const sideBarRef = useRef<LegacyRef<HTMLElement> | undefined>(null);
  return (
    <div className="h-screen">
      <Transition in={toggleSideBar} timeout={400}>
        {(state) => (
          <SideBarEditPage
            sideBarStyle={{
              transition: "0.5s",
              ...sideBarTransitionStyles[state],
            }}
            sideBarRef={sideBarRef}
          />
        )}
      </Transition>
      <Transition in={toggleSideBar} timeout={400}>
        {(state) => (
          <MainSectionPlotPage
            mainStyle={{
              transition: "0.5s",
              ...mainTransitionStyles[state],
            }}
          >
            <button
              className="
                rounded-full h-10 w-10
                flex items-center justify-center z-10
                bg-gray-50 bg-opacity-75 border border-gray-200 
              "
              onClick={() => setToggleSideBar(!toggleSideBar)}
            >
              <ChevronLeft className="text-gray-700" />
            </button>
          </MainSectionPlotPage>
        )}
      </Transition>
      {/* <PlotTransformation /> */}
    </div>
  )
}

export default SimplePlot