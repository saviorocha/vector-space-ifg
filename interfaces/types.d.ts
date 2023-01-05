type StateObj = {
  transformationArr: Transformation[];
  vectorArr: Vector[][];
};

type Dimesion = {
  margin: Margin;
  width: number;
  height: number;
};

type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type CoordinateData = {
  coord1: number;
  coord2: number;
  name?: string;
};

type VectorData = {
  coordinates: CoordinateData[];
  color: string;
}

type ExpressionType = {
  texExpression: string;
  mathExpression: string;
  value: number;
};

type SubmissionFormat = {
  successful: boolean;
  message?: string;
  data?: any;
}

type EventFunction = () => any;
