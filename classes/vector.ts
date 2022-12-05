class Vector {
  x: number;
  y: number;
  private _xTex: string;
  private _yTex: string;
  private _xExp: string;
  private _yExp: string;
  private _name: string;
  private _array: [ExpressionType, ExpressionType];
  private color: string;
  private _prevVector: Vector | undefined;
  private _isBasisVector: boolean;

  constructor(
    array: [ExpressionType, ExpressionType],
    _name: string = "v1",
    color: string = "",
    isBasisVector: boolean = false,
    _prevVector?: Vector
  ) {
    this._array = array;
    this.x = array[0].value;
    this.y = array[1].value;
    this._xTex = array[0].texExpression;
    this._yTex = array[1].texExpression;
    this._xExp = array[0].mathExpression;
    this._yExp = array[1].mathExpression;
    this._name = _name;
    this._prevVector = _prevVector || undefined;
    this.color = color;
    this._isBasisVector = isBasisVector;
  }

  get array(): [ExpressionType, ExpressionType] {
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

  get xTex(): string {
    return this._xTex;
  }

  get yTex(): string {
    return this._yTex;
  }

  get xExp(): string {
    return this._xExp;
  }

  get yExp(): string {
    return this._yExp;
  }

  /**
   * Returns a object to be used in the d3 plot
   */
   d3VectorFormatTeste = (): VectorData => {
    return {
      coordinates: [
        { coord1: 0, coord2: 0 },
        { coord1: this.x, coord2: this.y },
      ],
      name: this._name,
      color: this.color,
    };
  };
}

export default Vector;
