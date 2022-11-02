import { useConfigContext } from "../context/ConfigContext";

class Vector {
  x: number;
  y: number;
  private _name: string;
  private _array: [number, number];
  private color: string;
  private _prevVector: Vector | undefined;
  private _isBasisVector: boolean;

  constructor(
    array: [number, number],
    _name: string = "v1",
    color: string = "",
    isBasisVector: boolean = false,
    _prevVector?: Vector
  ) {
    array = [parseFloat(array[0].toFixed(2)), parseFloat(array[1].toFixed(2))];
    this._array = array;
    this.x = array[0];
    this.y = array[1];
    this._name = _name;
    this._prevVector = _prevVector || undefined;
    this.color = color;
    this._isBasisVector = isBasisVector;
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

  get prevVector(): Vector | undefined {
    return this._prevVector;
  }

  get isBasisVector(): boolean {
    return this._isBasisVector;
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

  // d3VectorFormat = (): VectorData[] => {
  //   return [{
  //     coordinates: [
  //       { coord1: 0, coord2: 0 },
  //       { coord1: this.x, coord2: this.y },
  //     ],
  //     color: this.color,
  //     name: this._name,

  //   }];
  // };
}

export default Vector;
