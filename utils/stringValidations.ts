import { evaluate, isObject } from "mathjs";

export function validateVectorName(name: string): boolean {
  if (name.length === 1) {
    return !!name.match(/[a-z]/i);
  }
  const regex = /^[a-z]_\{[0-9]+\}/;
  return regex.test(name);
}

export function validateVectorValues(values: string): boolean {
  const valuesArr = values
    .slice(1, self.length - 1)
    .split(",")
    .filter(Boolean);
  try {
    evaluate(valuesArr[0]);
    evaluate(valuesArr[1]);
  } catch (SyntaxError) {
    return false;
  }

  return (
    //prettier-ignore
    valuesArr.length === 2 &&
    (evaluate(valuesArr[0]) !== Infinity || evaluate(valuesArr[1]) !== Infinity) &&
    (!isObject(evaluate(valuesArr[0])) || !isObject(evaluate(valuesArr[1]))) &&
    values[0] === "(" &&
    values[values.length - 1] === ")"
  );
}

export function validateTransformationName(name: string): boolean {
  if (name.length === 1) {
    return !!name.match(/[A-Z]/i);
  }
  const regex = /^[A-Z]_\{[0-9]+\}/;
  return regex.test(name);
}

export function validateTransformationValues(valuesArr: string[]): boolean {
  console.log("valuesArr", valuesArr);
  for (let i = 0; i < valuesArr.length; i++) {
    try {
      if (
        evaluate(valuesArr[i]) === Infinity || // checks if it's a valid expression
        isObject(evaluate(valuesArr[i]))       // checks if it's a object (e.g. a imaginary number object)
      )
        return false;
    } catch (error) {
      return false;
    }
  }
  return true;
}

export function validateTransformationVar(name: string): boolean {
  if (name.length === 1) {
    return !!name.match(/[a-z]/i);
  }
  const regex = /^[a-z]_\{[0-9]+\}/;
  return regex.test(name);
}
