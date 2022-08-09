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

    this._vectors = this._previous
      ? this._previous?._vectors.map((vec) => {
          return this._transformation.applyTransformation(vec);
        })
      : [];
    this._next = null;
  }

  get transformation(): Transformation {
    return this._transformation;
  }

  get vectors(): Vector[] {
    return this._vectors;
  }

  set vectors(_vectors: Vector[]) {
    if (!this._previous) {
      this._vectors = _vectors;
    }
  }

  // get next(): StateNode | null {
  //   return this._next;
  // }

  // set next(_next: StateNode | null) {
  //   this._next = _next;
  // }
}

export default StateNode;