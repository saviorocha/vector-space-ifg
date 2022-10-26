import { ReactElement } from "react";
import StateList from "../classes/stateList";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";

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
  hideNumbers: boolean;
  setHideNumbers: Dispatch<SetStateAction<boolean>>;
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
  /** Style attribute of the main tag (can be a string or a css module) - used here for transitions*/
  mainStyle: CSSProperties | string;
}

interface IPlotTransformation {
  transformation: Transformation;
  trnIndex: number;
}
interface ISideBarProps {
  children?: ReactNode;
  sideBarStyle?: CSSProperties | string;
  /** Ref used by the TransitionGroup library */
  sideBarRef?: LegacyRef<HTMLElement> | undefined;
}

interface IHoverableDivProp {
  children: ReactNode;
  hoverText: string;
}

interface IBottomTransformationProps {
  /** Tex transformation expression to be rendered */
  transformationExpression: string;
}

interface IPlotVectorsProps {
  vectors: Vector[], 
  plotIndex: number 
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

interface IBarItemCalculationProps {
  transformation: Transformation;
  vectors: Vector[]
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
  /** Expression being rendered - must be a valid Tex expression */
  mathExpression: string;
  /** Title that appears on hover */
  title?: string;
  /** Double click event for updating the expression - used mainly on vectors */
  handleDoubleClick?: MouseEventHandler<HTMLParagraphElement> | undefined;
  /** Class name attribute of the p tag (can be a string or a css module) */
  classStyle?: CSSProperties | string;
}

interface IVectorTexProps {
  /** Tex vector expression */
  vectorExpression: string;
  /** Name of the vector being rendered; used in the component logic */
  vectorName: string;
}

interface ITransformationFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  updateOrCreate: string;
  matrixArr?: number[4];
}

interface IKeyboardProps {
  onChange: (input: string) => void;
  // @ts-ignore
  keyboardRef: MutableRefObject<Keyboard>;
}
