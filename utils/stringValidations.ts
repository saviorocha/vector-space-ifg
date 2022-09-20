import { evaluate } from "mathjs";

export function validateVectorName(name: string): boolean {
  if (name.length === 1) {
    return !!name.match(/[a-z]/i);
  }
  const regex = /^[A-Za-z]_\{[0-9]+\}/;
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
    valuesArr.length === 2 &&
    (evaluate(valuesArr[0]) !== Infinity ||
      evaluate(valuesArr[1]) !== Infinity) &&
    values[0] === "(" &&
    values[values.length - 1] === ")"
  );
}
