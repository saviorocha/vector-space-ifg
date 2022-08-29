import React, { useEffect, useState } from "react";
import Vector from "../classes/vector";
import BottomNav from "../components/ui/bottomNav";
import MainSection from "../components/ui/mainSection";
import SideNav from "../components/ui/sideNav";
import { useListContext } from "../context";

const EditPlanePage = () => {

  return (
    <>
      <SideNav />
      <MainSection />
      <BottomNav />
    </>
  );
};

export default EditPlanePage;
