import Transformation from "./transformation";
import Vector from "./vector";

class StateNode {
  private vectors: Vector[];
  private transformation: Transformation;
  _next: StateNode | null ;

  constructor(
    vectors: Vector[],
    transformation: Transformation = new Transformation([1, 0], [0, 1])
  ) {
    this.transformation = transformation;
    this.vectors = vectors.map((vec) => {
      return this.transformation.applyTransformation(vec);
    });
    this._next = null;
  }
}

export default StateNode;
