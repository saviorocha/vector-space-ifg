import { LegacyRef, useRef, useState } from "react";
import { ArrowLeft } from "react-feather";
import { Transition } from "react-transition-group";
import BottomBar from "../components/pagesections/bottomBar";
import MainSection from "../components/pagesections/mainSection";
import SideBar from "../components/pagesections/sideBar";

const mainTransitionStyles: any = {
  entering: { marginLeft: "0px" },
  entered: { marginLeft: "250px" },
  exiting: { marginLeft: "250px" },
  exited: { marginLeft: "0px" },
};

const sideBarTransitionStyles: any = {
  entering: { width: "0px", padding: "0px" },
  entered: { width: "250px" },
  exiting: { width: "250px" },
  exited: { width: "0px", padding: "0px" },
};

const EditPlanePage = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const mainRef = useRef<LegacyRef<HTMLElement> | undefined>(null);
  const sideBarRef = useRef<LegacyRef<HTMLElement> | undefined>(null);

  return (
    <>
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
                absolute rounded-full h-10 w-10 left-0 top-0 
                flex items-center justify-center 
                bg-gray-50 bg-opacity-75 border border-gray-200 
              "
              onClick={() => setToggleSideBar(!toggleSideBar)}
            >
              <ArrowLeft className="text-gray-700" />
            </button>
          </MainSection>
        )}
      </Transition>
      <BottomBar />
    </>
  );
};

export default EditPlanePage;
