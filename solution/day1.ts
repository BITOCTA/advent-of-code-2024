import { splitLines } from "./utils.ts";

export const solve1 = (input: string): number => {
  const [arr1, arr2]: [number[], number[]] = [[], []];
  const inputSplitted = splitLines(input);
  inputSplitted.forEach((v) => {
    if (!v.trim()) return;
    const [v1, v2] = v.split(/\s+/).map(Number);
    arr1.push(v1);
    arr2.push(v2);
  });

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  const result = arr1.reduce((sum, value, index) => {
    return sum + Math.abs(value - (arr2[index] || 0));
  }, 0);

  return result;
};

export const solve2 = (input: string): number => {
  const [arr1, arr2]: [number[], number[]] = [[], []];

  const inputSplitted = splitLines(input);

  inputSplitted.forEach((v) => {
    if (!v.trim()) return;
    const [v1, v2] = v.split(/\s+/).map(Number);
    arr1.push(v1);
    arr2.push(v2);
  });

  const counts = arr2.reduce<Record<number, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  const sum = arr1.reduce((acc, item) => {
    acc += (counts[item] && item * counts[item]) || 0;
    return acc;
  }, 0);

  return sum;
};
