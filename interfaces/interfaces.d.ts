import { ReactElement } from "react";
import StateList from "../classes/stateList";

interface IContextList {
  list: StateList;
  setList: Dispatch<SetStateAction<StateList>>;
  stateVecArr: StateObj;
  setStateVecArr: Dispatch<SetStateAction<StateObj>>;
}

interface IContextD3 {
  dimension: Dimesion;
  setDimension: Dispatch<SetStateAction<Dimesion>>;
  margin: Margin;
  setMargin: Dispatch<SetStateAction<Margin>>;
  events: EventFunction[] | [];
  setEvents: Dispatch<SetStateAction<EventFunction[] | []>>;
}

interface IContextName {
  currentPlot: number;
  setCurrentPlot: Dispatch<SetStateAction<number>>;
  vectorNameCounter: number;
  setVectorNameCounter: Dispatch<SetStateAction<number>>;
  transformationNameCounter: number;
  setTransformationNameCounter: Dispatch<SetStateAction<number>>;
}

interface IPlotProps {
  index: number;
  render: boolean;
  translate?: number;
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
  rightIcon?: ReactElement | null;
  subItems?: {
    title: string;
    handleItemOnClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  }[];
  handleOnClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

interface IRoundButton {
  icon: ReactElement;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  handleOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}

interface ITransitionButtonProps {
  children: ReactNode;
  icon: ReactElement;
  sectionStyle: CSSProperties | string;
  buttonStyle: CSSProperties | string;
  transitionStyles: any;
}

interface IRenderTexProps {
  mathExpression: string;
  title: string;
  handleDoubleClick: MouseEventHandler<HTMLParagraphElement> | undefined;
}

interface IVectorTexProps {
  mathExpression: string;
  vectorName: string;
}

interface IKeyboardProps {
  onChange: (input: string) => void;
  // @ts-ignore
  keyboardRef: MutableRefObject<Keyboard>;
}
