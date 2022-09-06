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
  children: ReactNode;
  mainStyle: CSSProperties | string;
  mainRef: LegacyRef<HTMLElement> | undefined;
}

interface ISideBarProps {
  sideBarStyle: CSSProperties | string;
  sideBarRef: LegacyRef<HTMLElement> | undefined;
}

interface IBarItemProps {
  title: string;
  leftIcon: ReactElement;
  rightIcon?: ReactElement|null;
  subItems?: string[];
  handleOnClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

interface IRoundButton {
  icon: ReactElement;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  handleOnClick?:  React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface ITransitionButtonProps {
  children: ReactNode, 
  icon: ReactElement, 
  sectionStyle: CSSProperties | string, 
  buttonStyle: CSSProperties | string,
  transitionStyles: any,
}
