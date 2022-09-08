import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";
import { IContextD3 } from "../interfaces/interfaces";

const D3Context = createContext<IContextD3>({} as IContextD3);

const D3ContextProvider: FunctionComponent<any> = ({ children }) => {
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
  const d3Provider = useMemo(
    () => ({ margin, setMargin, dimension, setDimension, events, setEvents }),
    [margin, setMargin, dimension, setDimension, events, setEvents]
  );

  return <D3Context.Provider value={d3Provider}>{children}</D3Context.Provider>;
};

export function useD3Context() {
  const context = useContext(D3Context);
  return context;
}

export default D3ContextProvider;
