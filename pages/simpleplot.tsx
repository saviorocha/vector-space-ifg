import { LegacyRef, useRef, useState } from "react";
import { ChevronLeft } from "react-feather";
import { Transition } from "react-transition-group";
import SideBarEditPage from "../components/pagesections/editPage/SideBarEditPage";
import MainSectionPlotPage from "../components/pagesections/simplerPlotPage/MainSectionPlotPage";

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
  // const [windowDimenion, detectHW] = useState({
  //   winWidth: window.innerWidth,
  //   winHeight: window.innerHeight,
  // });
  // const [mainPrctSize, setMainPrctSize] = useState("80%");
  // const [sidePrctSize, setSidePrctSize] = useState("20%");
  // // transition properties of the main component
  // const mainTransitionStyles = (): any => {
  //   return {
  //     entering: { width: "100%" },
  //     entered: { width: mainPrctSize },
  //     exiting: { width: mainPrctSize },
  //     exited: { width: "100%" },
  //   };
  // };

  // // transition properties of the sidebar component
  // const sideBarTransitionStyles = (): any => {
  //   return {
  //     entering: { width: "0px", padding: "0px" },
  //     entered: { width: sidePrctSize },
  //     exiting: { width: sidePrctSize },
  //     exited: { width: "0px", padding: "0px" },
  //   };
  // };

  // const detectSize = () => {
  //   detectHW({
  //     winWidth: window.innerWidth,
  //     winHeight: window.innerHeight,
  //   });
  // };

  // useEffect(() => {
  //   console.log(windowDimenion.winWidth > 800)
  //   if (windowDimenion.winWidth < 380) {
  //     setSidePrctSize("80%");
  //     setMainPrctSize("20%");
  //   }

  //   window.addEventListener("resize", detectSize);
  //   return () => {
  //     window.removeEventListener("resize", detectSize);
  //   };
  // }, [windowDimenion]);

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
    </div>
  );
};

export default SimplePlot;
