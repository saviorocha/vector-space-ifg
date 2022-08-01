class Vector {
  x: number;
  y: number;
  name: string;
  array: number[]

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.array = [x, y];
  }
}

export default Vector;
