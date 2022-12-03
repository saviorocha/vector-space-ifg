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

type VectorData = {
  coord1: number;
  coord2: number;
};

type ExpressionType = {
  texExpression: string;
  mathExpression: string;
  value: number;
};

// type VectorData = {
//   coordinates: {
//     coord1: number;
//     coord2: number;
//   }[];

//   color: string;
//   name: string;
// };

type EventFunction = () => any;
