import { Matrix, matrix, multiply, typeOf } from "mathjs";
import Vector from "./vector";

class Transformation {
  e1: number[];
  e2: number[];
  matrixTransformation: Matrix;
  name: string;

  constructor(e1: number[], e2: number[]) {
    this.e1 = e1;
    this.e2 = e2;
    this.matrixTransformation = matrix([e1, e2]);
    this.name = "T";
  }

  applyTransformation(vector: Vector): Vector {
    const coordinates: number[] = [
      multiply(this.matrixTransformation, vector.array).get([0]),
      multiply(this.matrixTransformation, vector.array).get([1]),
    ];
    return new Vector(coordinates);
  }
}

export default Transformation;
