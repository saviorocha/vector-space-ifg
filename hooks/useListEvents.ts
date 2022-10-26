import { useListContext } from "../context";
import useTexStr from "./useTexStr";
import useList from "./useList";
import StateList from "../classes/stateList";

const useListEvents = () => {
  const { vectorFromTex } = useTexStr();
  const { addVector, removeVector, updateVector } = useList();
  const { list, setList, setStateVecArr } = useListContext();
  /**
   * Adds a new vector to the list
   */
  const vectorSubmitHandler = (event: any) => {
    if (event.key === "Enter") {
      // triggered by enter key
      const newVector = vectorFromTex(event.target.value);

      if (!newVector) {
        alert("nome ou valores do vetor inválidos");
        return;
      }
      const newHead = addVector(newVector);
      const newList = new StateList(newHead);

      // updates list
      setList(newList);
      setStateVecArr(newList.toArray());

      event.target.value = "";
    }
  };
  
  const vectorDeleteHandler = (vectorName: string) => {
    const newHead = removeVector(vectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  const vectorUpdateHandler = (vectorExpression: string, event: any) => {
    const newVector = vectorFromTex(event.target.value);
    const prevVectorName = vectorFromTex(vectorExpression)?.name;
    if (!newVector || !prevVectorName) {
      alert("invalid");
      return;
    }
    const newHead = updateVector(newVector, prevVectorName);
    const newList = new StateList(newHead);
    setList(newList);
    setStateVecArr(newList.toArray());

    event.target.value = "";
  }
  return { vectorSubmitHandler, vectorDeleteHandler, vectorUpdateHandler };
};

export default useListEvents;
