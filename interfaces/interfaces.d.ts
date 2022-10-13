import { ReactElement } from "react";
import StateList from "../classes/stateList";

interface PropsChildren {
  children: React.ReactNode;
}
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
  transformationVars: [string, string];
  setTransformationVars: Dispatch<SetStateAction<[string, string]>>;
}

interface IPlotProps {
  index: number;
}

interface IMainSectionProps {
  /** Button used to toggle the side bar */
  children: ReactNode;
  /** Style attribute of the main tag (can be a string or a css module) */
  mainStyle: CSSProperties | string;
}

interface ISideBarProps {
  children?: ReactNode;
  sideBarStyle?: CSSProperties | string;
  sideBarRef?: LegacyRef<HTMLElement> | undefined;
}
interface IBarItemProps {
  /** comentário teste */
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
  classString?: string;
  idString?: string;
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
  handleDoubleClick?: MouseEventHandler<HTMLParagraphElement> | undefined;
}

interface IVectorTexProps {
  vectorExpression: string;
  vectorName: string;
}

interface ITransformationFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  updateOrCreate: string;
  matrixArr: number[];
}

interface IKeyboardProps {
  onChange: (input: string) => void;
  // @ts-ignore
  keyboardRef: MutableRefObject<Keyboard>;
}
