import { useEffect, useState } from "react";
import StateList from "../../classes/stateList";
import StateNode from "../../classes/stateNode";
import Transformation from "../../classes/transformation";
import Vector from "../../classes/vector";
import D3Plot from "../../components/d3/D3plot";

import { useListContext } from "../../context";
import useList from "../../hooks/useList";

const TesteGrafico2 = () => {
  const { list, setList } = useListContext();
  const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const dimensions: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };
  // const [head, setHead] = useState<StateNode>({} as StateNode);
  const { addVector, addTransformation, removeVector, removeTransformation } =
    useList();
  const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());

  const vectorSubmitHandler = (event: any) => {
    event?.preventDefault();

    const newHead = addVector(
      new Vector(
        [Number(event.target.first.value), Number(event.target.last.value)],
        event.target.name.value
        // "#bb00ff"
      )
    );
    const newList = new StateList(newHead);

    setList(newList);
    setStateVecArr(newList.toArray());
  };

  const transfromationSubmitHandler = (event: any) => {
    event?.preventDefault();
    const newHead = addTransformation(
      new Transformation(
        [Number(event.target.t00.value), Number(event.target.t10.value)],
        [Number(event.target.t01.value), Number(event.target.t11.value)],
        event.target.name.value
      )
    );
    const newList = new StateList(newHead);
    console.log("newList", newList);
    setList(newList);
    setStateVecArr(list.toArray());
  };

  function handleResetList(event: any) {
    event.preventDefault();
    setList(new StateList(new StateNode(undefined, null)));
    setStateVecArr(list.toArray());
  }

  useEffect(() => {
    // setStateVecArr(list.toArray());
    console.log("useeffect current list:", list);
  }, [list]);

  useEffect(() => {}, [stateVecArr]);

  return (
    <>
      <button
        onClick={() => {
          console.log(list);
        }}
      >
        print list
      </button>
      <button onClick={handleResetList}>reset list</button>
      <br />
      <form onSubmit={vectorSubmitHandler}>
        <label htmlFor="first">x:</label>
        <br />
        <input type="text" id="first" name="first" defaultValue={1} />
        <br />
        <label htmlFor="last">y:</label>
        <br />
        <input type="text" id="last" name="last" defaultValue={1} />
        <br />
        <input type="text" id="name" name="name" defaultValue={"v1"} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={transfromationSubmitHandler}>
        <input type="text" id="t00" defaultValue={2} />
        <input type="text" id="t01" defaultValue={0} />
        <br />
        <input type="text" id="t10" defaultValue={0} />
        <input type="text" id="t11" defaultValue={2} />
        <br />
        <input type="text" id="name" name="name" defaultValue={"T1"} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {stateVecArr.map((vec, i) => {
        return (
          <D3Plot key={i} stateVectors={vec} plotDimensions={dimensions} />
        );
      })}
    </>
  );
};

export default TesteGrafico2;
