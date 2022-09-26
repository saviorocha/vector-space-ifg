import Transformation from "./transformation";
import Vector from "./vector";

class StateNode {
  private _vectors: Vector[];
  private _transformation: Transformation;
  _next: StateNode | null;
  _previous: StateNode | null;

  constructor(
    _transformation: Transformation = new Transformation(),
    _previous: StateNode | null = null
  ) {
    this._previous = _previous;
    this._transformation = _transformation;

    this._vectors = this.updateVectors();
    this._next = null;
  }

  get transformation(): Transformation {
    return this._transformation;
  }

  set transformation(_transformation: Transformation) {
    this._transformation = _transformation;
  }

  get vectors(): Vector[] {
    return this._vectors;
  }

  set vectors(_vectors: Vector[]) {
    this._vectors = _vectors;
  }

  updateVectors(): Vector[] {
    return this._previous
      ? this._previous._vectors.map((vec) => {
          return this._transformation.applyTransformation(vec);
        })
      : [this._transformation.e1Vector, this._transformation.e2Vector];
  }

  // get next(): StateNode | null {
  //   return this._next;
  // }

  // set next(_next: StateNode | null) {
  //   this._next = _next;
  // }

  // get previous(): StateNode | null {
  //   return this._previous;
  // }

  // set previous(_previous: StateNode | null) {
  //   this._previous = _previous;
  // }
}

export default StateNode;
