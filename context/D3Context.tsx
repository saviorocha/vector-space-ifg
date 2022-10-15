import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";
import { IContextD3, PropsChildren } from "../interfaces/interfaces";

const events = ["showNumbers", false];

const D3Context = createContext<IContextD3>({} as IContextD3);

const D3ContextProvider: FunctionComponent<PropsChildren> = ({ children }) => {
  const [margin, setMargin] = useState<Margin>({
    top: 10,
    right: 30,
    bottom: 30,
    left: 50,
  });
  const [dimension, setDimension] = useState<Dimesion>({
    margin: margin,
    width: 460 - margin.left - margin.right,
    height: 400 - margin.top - margin.bottom,
  });
  const [events, setEvents] = useState([]);
  const [hideNumbers, setHideNumbers] = useState(false);
  const d3Provider = useMemo(
    () => ({
      margin,
      setMargin,
      dimension,
      setDimension,
      events,
      setEvents,
      hideNumbers,
      setHideNumbers,
    }),
    [
      margin,
      setMargin,
      dimension,
      setDimension,
      events,
      setEvents,
      hideNumbers,
      setHideNumbers,
    ]
  );

  return <D3Context.Provider value={d3Provider}>{children}</D3Context.Provider>;
};

export function useD3Context() {
  const context = useContext(D3Context);
  return context;
}

export default D3ContextProvider;
