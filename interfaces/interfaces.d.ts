import { ReactElement } from "react";
import StateList from "../classes/stateList";
interface IContextList {
  list: StateList;
  setList: Dispatch<SetStateAction<StateList>>;
}

interface IPlotProps {
  stateVectors: Vector[];
  plotDimensions: Dimesion;
}

interface IMainSectionProps {
  mainStyle: CSSProperties | string;
  mainRef: LegacyRef<HTMLElement> | undefined;
}

interface ISideBarProps {
  sideBarStyle: CSSProperties | string;
  sideBarRef: LegacyRef<HTMLElement> | undefined;
}

interface IBarItemProps {
  title: string;
  icon: ReactElement;
  subItems?: string[];
}
