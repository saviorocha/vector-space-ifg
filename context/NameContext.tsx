import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";
import { IContextName, PropsChildren } from "../interfaces/interfaces";

const NameContext = createContext({} as IContextName);

const NameContextProvider: FunctionComponent<PropsChildren> = ({
  children,
}) => {
  const [vectorNameCounter, setVectorNameCounter] = useState<number>(1);
  const [transformationNameCounter, setTransformationNameCounter] = useState<number>(1);
  const [transformationVars, setTransformationVars] = useState<[string, string]>(["a", "b"]);
  const [currentPlot, setCurrentPlot] = useState<number>(0);

  const nameProvider = useMemo(
    () => ({
      currentPlot,
      setCurrentPlot,
      vectorNameCounter,
      setVectorNameCounter,
      transformationNameCounter,
      setTransformationNameCounter,
      transformationVars,
      setTransformationVars,
    }),
    [
      currentPlot,
      setCurrentPlot,
      vectorNameCounter,
      setVectorNameCounter,
      transformationNameCounter,
      setTransformationNameCounter,
      transformationVars,
      setTransformationVars,
    ]
  );

  return (
    <NameContext.Provider value={nameProvider}>{children}</NameContext.Provider>
  );
};

export function useNameContext() {
  const context = useContext(NameContext);
  return context;
}

export default NameContextProvider;
