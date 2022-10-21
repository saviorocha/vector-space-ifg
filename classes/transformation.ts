import { Matrix, matrix, multiply, transpose } from "mathjs";
import Vector from "./vector";

class Transformation {
  private _e1: [number, number];
  private _e2: [number, number];
  private _e1Vector: Vector;
  private _e2Vector: Vector;
  private _name: string;
  private _matrixTransformation: Matrix;

  constructor(
    _e1: [number, number] = [1, 0],
    _e2: [number, number] = [0, 1],
    _name: string = "T"
  ) {
    this._e1 = _e1;
    this._e2 = _e2;
    this._name = _name;
    this._e1Vector = new Vector(this._e1, "e_{1}", "red");
    this._e2Vector = new Vector(this._e2, "e_{2}", "blue");
    this._matrixTransformation = transpose(matrix([_e1, _e2])); // have to transpose to match mathjs matrix
    // console.log(this._matrixTransformation);
  }

  applyTransformation(vector: Vector): Vector {
    const coordinates: [number, number] = [
      multiply(this._matrixTransformation, vector.array).get([0]),
      multiply(this._matrixTransformation, vector.array).get([1]),
    ];
    return new Vector(coordinates, `${this._name}(${vector.name})`, "", vector);
  }

  get e1(): [number, number] {
    return this._e1;
  }

  get e2(): [number, number] {
    return this._e2;
  }

  get e1Vector(): Vector {
    return this._e1Vector;
  }

  get e2Vector(): Vector {
    return this._e2Vector;
  }

  get name(): string {
    return this._name;
  }

  set name(_name) {
    this._name = _name;
  }
}

export default Transformation;
