class Vector {
  private x: number;
  private y: number;
  private name: string;
  private _array: number[]

  constructor(array:number[], name: string = "v") {
    this._array = array;
    this.x = array[0];
    this.y = array[1];
    this.name = name;
  }

  get array(): number[] {
    return this._array;
  }
}

export default Vector;
