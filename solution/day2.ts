import { splitLines } from "./utils.ts";

const isSafe = (diff: number): boolean => {
  const absDiff = Math.abs(diff);
  return absDiff >= 1 && absDiff <= 3;
};

const isValid = (numbers: number[]): boolean => {
  let isIncreasing: boolean | undefined;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];
    const currentIncreasing = diff > 0;

    if (
      diff === 0 || !isSafe(diff) ||
      (isIncreasing !== undefined && isIncreasing !== currentIncreasing)
    ) {
      return false;
    }

    isIncreasing = currentIncreasing;
  }

  return true;
};

const solve = (input: string, allowRemoval: boolean): number => {
  return splitLines(input).reduce((safeCount, line) => {
    const numbers = line.split(/\s+/).map(Number);

    if (isValid(numbers)) {
      return safeCount + 1;
    }

    if (allowRemoval) {
      for (let i = 0; i < numbers.length; i++) {
        const modifiedNumbers = numbers.filter((_, index) => index !== i);
        if (isValid(modifiedNumbers)) {
          return safeCount + 1;
        }
      }
    }

    return safeCount;
  }, 0);
};

export const solve1 = (input: string): number => solve(input, false);

export const solve2 = (input: string): number => solve(input, true);
