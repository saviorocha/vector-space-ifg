import { ReactElement, ReactNode, SetStateAction } from "react";
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
}

interface IContextName {
  currentPlot: number;
  setCurrentPlot: Dispatch<SetStateAction<number>>;
  vectorNameCounter: number;
  setVectorNameCounter: Dispatch<SetStateAction<number>>;
  transformationNameCounter: number;
  setTransformationNameCounter: Dispatch<SetStateAction<number>>;
  vectorNameArr: string[];
  setVectorNameArr: Dispatch<SetStateAction<string[]>>;
  transformationNameArr: string[];
  setTransformationNameArr: Dispatch<SetStateAction<string[]>>;
}

interface IContextConfig {
  hideNumbers: boolean;
  setHideNumbers: Dispatch<SetStateAction<boolean>>;
  decimalPoint: number;
  setDecimalPoint: Dispatch<SetStateAction<boolean>>;
  showBasisVectors: boolean;
  setShowBasisVectors: Dispatch<SetStateAction<boolean>>;
  showMathSymbols: boolean;
  setShowMathSymbols: Dispatch<SetStateAction<boolean>>;
  vectorColor: string;
  setVectorColor: Dispatch<SetStateAction<string>>;
  transformationVars: [string, string];
  setTransformationVars: Dispatch<SetStateAction<[string, string]>>;
}

interface IPlotProps {
  /** Plane index on the page */
  index: number;
}

interface IMainSectionProps {
  /** Button used to toggle the side bar */
  children: ReactNode;
  /** Style attribute of the main tag (can be a string or a css module) - used here for transitions*/
  mainStyle: CSSProperties | string;
}

interface IPlotTransformation {
  /** Transformation object */
  transformation: Transformation;
  /** Index of the transformation on the stateVecArr */
  trnIndex: number;
}
interface ISideBarProps {
  children?: ReactNode;
  sideBarStyle?: CSSProperties | string;
  /** Ref used by the TransitionGroup library */
  sideBarRef?: LegacyRef<HTMLElement> | undefined;
}

interface IBottomItemProps {
  title: string;
  icon: ReactElement;
  handleOnClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

interface IHoverableDivProp {
  children: ReactNode;
  hoverText?: string;
  hoverTexExpression?: string;
}

interface IBottomTransformationProps {
  /** Tex transformation expression to be rendered */
  transformationExpression: string;
}

interface IPlotVectorsProps {
  vectors: Vector[];
  plotIndex: number;
}

interface IInfoBox {
  children: ReactNode;
  customStyles?: string;
  flexDirection?: string;
}

interface ListItemProps {
  /** Link to the page */
  href: string;
  /** Text */
  linkText: string;
  /** Checks if it's a subitem */
  isSubItem?: boolean;
}

interface CustomIconProps {
  className?: CSSProperties;
  logoColor?: string;
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
  vectors: Vector[];
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
  /** Vector being rendered */
  vector: Vector;
  /** Tex expression to be rendered */
  expression: string;
  currentPlot: number;
}

interface ITransformationFormProps {
  /** Form's onSubmit (for creating or updating transformations) */
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  /** Array with the matrix transformation */
  matrixArr?: number[4];
  /** Name of the transformation */
  transformationName?: string;
}

interface IKeyboardProps {
  onChange: (input: string) => void;
  // @ts-ignore
  keyboardRef: MutableRefObject<Keyboard>;
}

interface IConfigItemProp {
  children: ReactNode;
  icon: ReactElement;
  title: string;
}
