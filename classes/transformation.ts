import { Matrix, matrix, multiply, typeOf } from "mathjs";
import Vector from "./vector";

class Transformation {
  private e1: number[];
  private e2: number[];
  private matrixTransformation: Matrix;
  private name: string;

  constructor(e1: number[] = [1, 0], e2: number[] = [0, 1]) {
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
