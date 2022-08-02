import { createContext, FunctionComponent, useContext, useMemo, useState } from "react";
import StateList from "../classes/stateList";
import { IContextList } from "../compiler/types";

const ListContext = createContext<IContextList>(
    {} as IContextList
);

const ListContextProvider: FunctionComponent<any> = ({ children }) => {
  const [list, setList] = useState(new StateList());
  const providerList = useMemo(() => ({ list, setList }), [list, setList]);

  return (
    <ListContext.Provider value={providerList}>
      {children}
    </ListContext.Provider>
  );
};

export function useListContext() {
    const context = useContext(ListContext);
    return context;
}

export default ListContextProvider;
