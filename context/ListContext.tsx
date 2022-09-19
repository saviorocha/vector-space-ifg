import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";
import StateList from "../classes/stateList";
import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import { IContextList } from "../interfaces/interfaces";

const ListContext = createContext<IContextList>({} as IContextList);

const ListContextProvider: FunctionComponent<any> = ({ children }) => {
  const [list, setList] = useState(new StateList(new StateNode()));
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
