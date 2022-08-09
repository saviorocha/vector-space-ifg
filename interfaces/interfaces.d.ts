import StateList from "../classes/stateList";
interface IContextList {
  list: StateList;
  setList: Dispatch<SetStateAction<StateList>>;
}

interface IPlotProps {
  stateVectors: Vector[];
  plotDimensions: Dimesion;
}

