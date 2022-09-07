import { LegacyRef, useRef, useState } from "react";
import { ChevronLeft } from "react-feather";
import { Transition } from "react-transition-group";
import BottomBar from "../components/pagesections/BottomBar";
import MainSection from "../components/pagesections/MainSection";
import SideBar from "../components/pagesections/SideBar";

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

const EditPlanePage = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const mainRef = useRef<LegacyRef<HTMLElement> | undefined>(null);
  const sideBarRef = useRef<LegacyRef<HTMLElement> | undefined>(null);

  return (
    <div className="h-screen">
      <Transition in={toggleSideBar} timeout={400}>
        {(state) => (
          <SideBar
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
          <MainSection
            mainStyle={{
              transition: "0.5s",
              ...mainTransitionStyles[state],
            }}
            mainRef={mainRef}
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
          </MainSection>
        )}
      </Transition>
      <BottomBar />
    </div>
  );
};

export default EditPlanePage;
