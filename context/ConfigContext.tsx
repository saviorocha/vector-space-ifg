import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";
import { IContextConfig, PropsChildren } from "../interfaces/interfaces";

const ConfigContext = createContext<IContextConfig>({} as IContextConfig);

const ConfigContextProvider: FunctionComponent<PropsChildren> = ({
  children,
}) => {
  const [showBasisVectors, setShowBasisVectors] = useState(false);
  const [hideNumbers, setHideNumbers] = useState(false);
  const [decimalPoint, setDecimalPoint] = useState(2);
  const [showMathSymbols, setShowMathSymbols] = useState(true);
  const [vectorColor, setVectorColor] = useState("#4682b4");
  const [transformationVars, setTransformationVars] = useState<
    [string, string]
  >(["a", "b"]);

  const configProvider = useMemo(
    () => ({
      showBasisVectors,
      setShowBasisVectors,
      hideNumbers,
      setHideNumbers,
      decimalPoint,
      setDecimalPoint,
      showMathSymbols,
      setShowMathSymbols,
      vectorColor,
      setVectorColor,
      transformationVars,
      setTransformationVars,
    }),
    [
      showBasisVectors,
      setShowBasisVectors,
      hideNumbers,
      setHideNumbers,
      decimalPoint,
      setDecimalPoint,
      showMathSymbols,
      setShowMathSymbols,
      vectorColor,
      setVectorColor,
      transformationVars,
      setTransformationVars,
    ]
  );

  return (
    <ConfigContext.Provider value={configProvider}>
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfigContext() {
  const context = useContext(ConfigContext);
  return context;
}

export default ConfigContextProvider;
