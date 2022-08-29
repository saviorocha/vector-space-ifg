class Vector {
  private x: number;
  private y: number;
  private _name: string;
  private _array: [number, number];
  private color: string;

  constructor(array: [number, number], _name: string = "v1", color: string = "") {
    this._array = array;
    this.x = array[0];
    this.y = array[1];
    this._name = _name;
    this.color = color;
  }

  get array(): [number, number] {
    return this._array;
  }

  get name(): string {
    return this._name;
  }

  set name(_name: string) {
    this._name = _name; 
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
