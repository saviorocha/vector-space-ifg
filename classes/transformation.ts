import { Matrix, matrix, multiply, transpose } from "mathjs";
import Vector from "./vector";

class Transformation {
  private _e1: [ExpressionType, ExpressionType];
  private _e2: [ExpressionType, ExpressionType];
  private _e1Vector: Vector;
  private _e2Vector: Vector;
  private _name: string;
  private _matrixTransformation: Matrix;

  constructor(
    _e1: [ExpressionType, ExpressionType] = [
      { value: 1, texExpression: "1", mathExpression: "1" },
      { value: 0, texExpression: "0", mathExpression: "0" },
    ],
    _e2: [ExpressionType, ExpressionType] = [
      { value: 0, texExpression: "0", mathExpression: "0" },
      { value: 1, texExpression: "1", mathExpression: "1" },
    ],
    _name: string = "T0"
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

  applyTransformation(vector: Vector): Vector {
    const value1 = parseFloat(
      multiply(
        this._matrixTransformation,
        vector.array.map((el, i) => el.value)
      ).get([0])
    );
    const value2 = parseFloat(
      multiply(
        this._matrixTransformation,
        vector.array.map((el, i) => el.value)
      ).get([1])
    );
    const coordinates: [ExpressionType, ExpressionType] = [
      {
        value: value1,
        texExpression: value1.toString(),
        mathExpression: value1.toString(),
      },
      {
        value: value2,
        texExpression: value2.toString(),
        mathExpression: value2.toString(),
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

  get e1(): [ExpressionType, ExpressionType] {
    return this._e1;
  }

  get e2(): [ExpressionType, ExpressionType] {
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
