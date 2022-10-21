import React, { FunctionComponent } from "react";
import { useListContext } from "../../../context";
import { ISideBarProps } from "../../../interfaces/interfaces";
import BarItemCalculation from "../../ui/BarItemCalculation";
import SideBar from "../../ui/SideBar";

const SideBarAnimationPage: FunctionComponent<ISideBarProps> = ({
  sideBarStyle,
  sideBarRef,
}) => {
  const { stateVecArr } = useListContext();
  return (
    <SideBar
      // className={sidebarClass}
      sideBarRef={sideBarRef}
      sideBarStyle={sideBarStyle}
    >
      {stateVecArr.transformationArr.map((trn, i) => {
        return (
          <aside key={i}>
            <BarItemCalculation
              transformation={trn}
              vectors={stateVecArr.vectorArr[i]}
            />
          </aside>
        );
      })}
    </SideBar>
  );
};

export default SideBarAnimationPage;
