class Vector {
  private x: number;
  private y: number;
  private name: string;
  private _array: [number, number];
  private color: string;

  constructor(array: [number, number], name: string = "v", color: string = "") {
    this._array = array;
    this.x = array[0];
    this.y = array[1];
    this.name = name;
    this.color = color;
  }

  get array(): [number, number] {
    return this._array;
  }

  /**
   * Returns a object to be used in the d3 plot
   * @returns object
   */
  d3VectorFormat = (): VectorData[] => {
    return [
      { coord1: 0, coord2: 0 },
      { coord1: this.x, coord2: this.y },
    ];
  };
  
}

export default Vector;
