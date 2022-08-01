class Vector {
  x: number;
  y: number;
  name: string;
  array: number[]

  constructor(array:number[], name: string = "v") {
    this.array = array;
    this.x = array[0];
    this.y = array[1];
    this.name = name;
  }
}

export default Vector;
