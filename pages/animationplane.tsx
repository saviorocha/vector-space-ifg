import { useRouter } from "next/router";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import D3PlotAnimation from "../components/d3/D3plotAnimation";
import MainSectionAnimationPage from "../components/pagesections/animationPage/MainSectionAnimationPage";
import SideBarAnimationPage from "../components/pagesections/animationPage/SideBarAnimationPage";
import { useD3Context } from "../context";

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

const AnimationPlane = () => {
  const { setEvents } = useD3Context();

  useEffect(() => {
    setEvents([]);
  }, []);

  return (
    <div className="h-screen">
      <SideBarAnimationPage />
      <MainSectionAnimationPage />
    </div>
  );
};

export default AnimationPlane;
