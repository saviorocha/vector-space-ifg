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
  const [showGridLines, setShowGridLines] = useState(true);
  const [hideNumbers, setHideNumbers] = useState(false);
  const [decimalPoint, setDecimalPoint] = useState(2);
  const [showMathSymbols, setShowMathSymbols] = useState(true);

  const configProvider = useMemo(
    () => ({
      showBasisVectors,
      setShowBasisVectors,
      hideNumbers,
      setHideNumbers,
      showGridLines,
      setShowGridLines,
      decimalPoint,
      setDecimalPoint,
      showMathSymbols,
      setShowMathSymbols,
    }),
    [
      showBasisVectors,
      setShowBasisVectors,
      hideNumbers,
      setHideNumbers,
      showGridLines,
      setShowGridLines,
      decimalPoint,
      setDecimalPoint,
      showMathSymbols,
      setShowMathSymbols,
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
