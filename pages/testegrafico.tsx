import { useState } from "react";
import StateList from "../classes/stateList";
import StateNode from "../classes/stateNode";
import Transformation from "../classes/transformation";
import Vector from "../classes/vector";
import D3Plot from "../components/d3/d3plot";
import { useListContext } from "../context";

const TesteGrafico = () => {
  const { list, setList } = useListContext();
  const [head, setHead] = useState(() => new StateNode());
  const [vectorArr, setVectorArr] = useState<Vector[]>([]);
  const [transformationArr, setTransformationArr] = useState<Transformation[]>(
    []
  );
  // const [stateVecArr, setStateVecArr] = useState<Vector[][]>([
  //   [list.head?.transformation.e1Vector, list.head?.transformation.e2Vector],
  // ]);

  const [stateVecArr, setStateVecArr] = useState<Vector[][]>([]);

  const vectorSubmitHandler = (event: any) => {
    event?.preventDefault();
    setVectorArr(() => {
      vectorArr.push(
        new Vector(
          [Number(event.target.first.value), Number(event.target.last.value)],
          undefined,
          "#bb00ff"
        )
      );
      return vectorArr;
    });
    updateVectors();
  };

  const updateVectors = () => {
    let newHead = new StateNode(undefined, null);
    newHead.vectors = vectorArr;

    setHead(newHead);
    setList(new StateList(newHead));
    // setStateVecArr(() => {
    //   stateVecArr[0].push(...vectorArr);
    //   return stateVecArr;
    // });
    setStateVecArr(list.toArray);

    // console.log("stateVecArr", stateVecArr);
    console.log("current list:", list);
    // console.log("new list:", new StateList(newHead));
    // console.log("head", newHead.vectors);
    // console.log("vectorArr", vectorArr);
  };

  const transfromationSubmitHandler = (event: any) => {
    event?.preventDefault();
    const trans = event.target;

    // setStateVecArr(() => {
    //   stateVecArr.push([
    //     new Vector([Number(trans.t00.value), Number(trans.t10.value)]),
    //     new Vector([Number(trans.t01.value), Number(trans.t11.value)]),
    //   ]);
    //   return stateVecArr;
    // });

    setTransformationArr(() => {
      transformationArr.push(
        new Transformation(
          [Number(trans.t00.value), Number(trans.t01.value)],
          [Number(trans.t10.value), Number(trans.t11.value)]
        )
      );
      return transformationArr;
    });
    updateTransformations();
  };

  const updateTransformations = () => {
    let newstate = head;
    for (let i = 0; i < transformationArr.length; i++) {
      newstate._next = new StateNode(transformationArr[i], newstate);
      newstate = newstate._next;
    }
    let newList = new StateList(head);
    newList.size = transformationArr.length;

    setList(newList);
    setStateVecArr(list.toArray);

    console.log("current list:", list);
  };

  // useEffect(() => {
  //   console.log("current list:", list);
  // }, []);

  return (
    <>
      <form onSubmit={vectorSubmitHandler}>
        <label htmlFor="first">x:</label>
        <br />
        <input
          type="text"
          id="first"
          name="first"
          // defaultValue={1}
        />
        <br />
        <label htmlFor="last">y:</label>
        <br />
        <input
          type="text"
          id="last"
          name="last"
          // defaultValue={1}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={transfromationSubmitHandler}>
        <input type="text" id="t00" defaultValue={1} />
        <input type="text" id="t01" defaultValue={1} />
        <br />
        <input type="text" id="t10" defaultValue={1} />
        <input type="text" id="t11" defaultValue={1} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* {stateVecArr.map((vec, i) => {
          return <D3Plot key={i} stateVectors={vec} />;
        })} */}
    </>
  );
};

export default TesteGrafico;
