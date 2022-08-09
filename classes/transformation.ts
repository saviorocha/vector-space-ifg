import { Matrix, matrix, multiply, typeOf } from "mathjs";
import Vector from "./vector";

class Transformation {
  private e1: [number, number];  
  private e2: [number, number];  
  private _e1Vector: Vector;
  private _e2Vector: Vector;
  private matrixTransformation: Matrix;
  private name: string;

  constructor(e1: [number, number] = [1, 0], e2: [number, number] = [0, 1]) {
    this.e1 = e1;
    this.e2 = e2;
    this._e1Vector = new Vector(this.e1, undefined, "red");
    this._e2Vector = new Vector(this.e2, undefined, "blue");
    this.matrixTransformation = matrix([e1, e2]);
    this.name = "T";
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

}

export default Transformation;
