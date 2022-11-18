import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState
} from "react";
import StateList from "../classes/stateList";
import StateNode from "../classes/stateNode";
import { IContextList, PropsChildren } from "../interfaces/interfaces";
import { useConfigContext } from "./ConfigContext";

const ListContext = createContext<IContextList>({} as IContextList);

const ListContextProvider: FunctionComponent<PropsChildren> = ({ children }) => {
  const { decimalPoint } = useConfigContext()
  const [list, setList] = useState(new StateList(new StateNode(undefined, undefined, decimalPoint)));
  const [stateVecArr, setStateVecArr] = useState<StateObj>(list.toArray());

  const providerList = useMemo(
    () => ({
      list,
      setList,
      stateVecArr,
      setStateVecArr,
    }),
    [list, setList, stateVecArr, setStateVecArr]
  );

  return (
    <ListContext.Provider value={providerList}>{children}</ListContext.Provider>
  );
};

export function useListContext() {
  const context = useContext(ListContext);
  return context;
}

export default ListContextProvider;
