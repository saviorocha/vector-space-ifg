import { Matrix, matrix, multiply, typeOf } from "mathjs";
import Vector from "./vector";

class Transformation {
  private e1: [number, number];  
  private e2: [number, number];  
  private _e1Vector: Vector;
  private _e2Vector: Vector;
  private _name: string;
  private matrixTransformation: Matrix;

  constructor(e1: [number, number] = [1, 0], e2: [number, number] = [0, 1], _name: string = "T") {
    this.e1 = e1;
    this.e2 = e2;
    this._name = _name;
    this._e1Vector = new Vector(this.e1, undefined, "red");
    this._e2Vector = new Vector(this.e2, undefined, "blue");
    this.matrixTransformation = matrix([e1, e2]);
  }

  applyTransformation(vector: Vector): Vector {
    const coordinates: [number, number] = [
      multiply(this.matrixTransformation, vector.array).get([0]),
      multiply(this.matrixTransformation, vector.array).get([1]),
    ];
    return new Vector(coordinates);
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
