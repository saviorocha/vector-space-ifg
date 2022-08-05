class Vector {
  private x: number;
  private y: number;
  private name: string;
  private _array: number[];

  constructor(array: number[], name: string = "v") {
    this._array = array;
    this.x = array[0];
    this.y = array[1];
    this.name = name;
  }

  get array(): number[] {
    return this._array;
  }

  /**
   * Returns a object to be used in the d3 plot
   * @returns object
   */
  d3VectorFormat = () => {
    return [
      { pos1: 0, pos2: 0 },
      { pos1: this.x, pos2: this.y },
    ];
  };
}

export default Vector;
