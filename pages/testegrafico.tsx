import { useEffect, useState } from "react";
import StateList from "../classes/stateList";
import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import D3Plot from "../components/d3/d3plot";
import { useListContext } from "../context";

const TesteGrafico = () => {
  const { list, setList } = useListContext();
  const marginValues: Margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const dimensions: Dimesion = {
    margin: marginValues,
    width: 460 - marginValues.left - marginValues.right,
    height: 400 - marginValues.top - marginValues.bottom,
  };
  // const [head, setHead] = useState<StateNode>({} as StateNode);
  const [vectorArr, setVectorArr] = useState<Vector[]>([]);
  const [transformationArr, setTransformationArr] = useState<Transformation[]>(
    []
  );
  const [stateVecArr, setStateVecArr] = useState<Vector[][]>(list.toArray());

  const vectorSubmitHandler = (event: any) => {
    event?.preventDefault();
    vectorArr.push(
      new Vector(
        [Number(event.target.first.value), Number(event.target.last.value)],
        undefined,
        "#bb00ff"
      )
    );
    setVectorArr(vectorArr);
    // console.log("vectorArr", vectorArr, "length", vectorArr.length);
    updateVectors();
  };

  const updateVectors = () => {
    let newHead = new StateNode(undefined, null);
    newHead.vectors = vectorArr;
    // newHead.vectors.push(...list.head?.vectors!);
    // console.log(newHead);

    let newstate = newHead;
    for (let i = 0; i < transformationArr.length; i++) {
      newstate._next = new StateNode(transformationArr[i], newstate);
      newstate = newstate._next;
    }
    let newList = new StateList(newHead);

    setStateVecArr(newList.toArray());
    setList(newList);

    // newHead._next = list.head?._next;
    // list.head?.vectors.push(...vectorArr);
    // const newList = new StateList(list.head!);

    // setStateVecArr(newList.toArray());
    // setList(newList);

    // console.log("toArray", newList.toArray());
    // console.log("stateVecArr", stateVecArr);
    // console.log("vectorArr", vectorArr);
    // console.log("current list:", list);
    // console.log("new list:", new StateList(newHead));
    // console.log("new list:", newList);
    // console.log("vectorArr", vectorArr, "length", vectorArr.length);
  };

  const transfromationSubmitHandler = (event: any) => {
    event?.preventDefault();
    const trans = event.target;

    transformationArr.push(
      new Transformation(
        [Number(trans.t00.value), Number(trans.t10.value)],
        [Number(trans.t01.value), Number(trans.t11.value)]
      )
    );
    setTransformationArr(transformationArr);
    updateTransformations();
  };

  const updateTransformations = () => {
    let newstate = list.head;
    for (let i = 0; i < transformationArr.length; i++) {
      newstate._next = new StateNode(transformationArr[i], newstate);
      newstate = newstate._next;
    }
    let newList = new StateList(list.head);

    setStateVecArr(newList.toArray());
    setList(newList);
  };

  useEffect(() => {
    console.log("current list:", list);
    // setStateVecArr(list.toArray())
  }, [list]);
  useEffect(() => {
    console.log("stateVecArr:", stateVecArr);
  }, [stateVecArr]);

  return (
    <>
      <form onSubmit={vectorSubmitHandler}>
        <label htmlFor="first">x:</label>
        <br />
        <input type="text" id="first" name="first" defaultValue={1} />
        <br />
        <label htmlFor="last">y:</label>
        <br />
        <input type="text" id="last" name="last" defaultValue={1} />
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

export default TesteGrafico;
