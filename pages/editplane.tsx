import { useState } from "react";
import BottomBar from "../components/ui/bottomBar";
import MainSection from "../components/ui/mainSection";
import SideBar from "../components/ui/sideBar";

const EditPlanePage = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  return (
    <>
      <SideBar />
      <MainSection />
      <BottomBar  />
    </>
  );
};

export default EditPlanePage;
