import { Matrix, matrix, multiply, transpose } from "mathjs";
import Vector from "./vector";

class Transformation {
  private _e1: [CoordinateType, CoordinateType];
  private _e2: [CoordinateType, CoordinateType];
  private _e1Vector: Vector;
  private _e2Vector: Vector;
  private _name: string;
  private _matrixTransformation: Matrix;

  constructor(
    _e1: [CoordinateType, CoordinateType] = [
      { value: 1, texExpression: "1" },
      { value: 0, texExpression: "0" },
    ],
    _e2: [CoordinateType, CoordinateType] = [
      { value: 0, texExpression: "0" },
      { value: 1, texExpression: "1" },
    ],
    _name: string = "T"
  ) {
    this._e1 = _e1;
    this._e2 = _e2;
    this._name = _name;
    this._e1Vector = new Vector(this._e1, "e_{1}", "red", true);
    this._e2Vector = new Vector(this._e2, "e_{2}", "blue", true);
    this._matrixTransformation = transpose(
      // have to transpose to match mathjs matrix
      matrix([_e1.map((el, i) => el.value), _e2.map((el, i) => el.value)])
    );
  }

  applyTransformation(vector: Vector, decimalPoint: number): Vector {
    const value1 = parseFloat(
      multiply(
        this._matrixTransformation,
        vector.array.map((el, i) => el.value)
      )
        .get([0])
        .toFixed(decimalPoint)
    );
    const value2 = parseFloat(
      multiply(
        this._matrixTransformation,
        vector.array.map((el, i) => el.value)
      )
        .get([1])
        .toFixed(decimalPoint)
    );
    const coordinates: [CoordinateType, CoordinateType] = [
      {
        value: value1,
        texExpression: value1.toString(),
      },
      {
        value: value2,
        texExpression: value2.toString(),
      },
    ];
    return new Vector(
      coordinates,
      `${this._name}(${vector.name})`,
      "",
      vector.isBasisVector,
      vector
    );
  }

  get e1(): [CoordinateType, CoordinateType] {
    return this._e1;
  }

  get e2(): [CoordinateType, CoordinateType] {
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
