import { splitAndGroupByEmptyLine } from "./utils.ts";
import _ from "https://esm.sh/lodash@4.17.21";

// TODO: refactor
export const solve1 = (input: string) => {
  const [rules, updates] = splitAndGroupByEmptyLine(input);

  const cannotBeAfter: Map<string, Set<string>> = new Map();

  rules.forEach((rule) => {
    const nums = rule.split("|");
    cannotBeAfter.set(
      nums[1],
      cannotBeAfter.get(nums[1])?.add(nums[0]) || new Set([nums[0]]),
    );
  });

  let sum = 0;

  updatesLoop: for (const update of updates) {
    const nums = update.split(",");

    for (let j = 0; j < nums.length; j++) {
      const num = nums[j];
      const remainingSet = new Set(nums.slice(j + 1));

      if (
        cannotBeAfter.get(num) &&
        !cannotBeAfter.get(num)?.isDisjointFrom(remainingSet)
      ) {
        continue updatesLoop;
      }
    }

    sum += Number(nums[Math.floor(nums.length / 2)]);
  }

  return sum;
};

const recursion = (cba: Map<string, Set<string>>, arr: string[]) => {
  let res: string[] = [];
  if (arr.length === 0) {
    return [];
  }
  if (arr.length === 1) {
    return arr;
  }
  if (arr.length === 2) {
    if (cba.get(arr[0]) && cba.get(arr[0])?.has(arr[1])) {
      return [arr[1], arr[0]];
    } else {
      return arr;
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      const remain = arr.slice(i + 1);
      if (
        cba.get(element) && !cba.get(element)?.isDisjointFrom(new Set(remain))
      ) {
        const head = recursion(
          cba,
          remain.filter((x) => cba.get(element)?.has(x)),
        );
        const tail = recursion(
          cba,
          remain.filter((x) => !cba.get(element)?.has(x)),
        );
        const combined = [...head, element, ...tail];
        return [...res, ...combined];
      } else {
        res.push(element);
      }
    }
  }
  return res;
};

export const solve2 = (input: string) => {
  const [rules, updates] = splitAndGroupByEmptyLine(input);

  const cannotBeAfter: Map<string, Set<string>> = new Map();

  rules.forEach((rule) => {
    const nums = rule.split("|");
    cannotBeAfter.set(
      nums[1],
      cannotBeAfter.get(nums[1])?.add(nums[0]) || new Set([nums[0]]),
    );
  });

  let sum = 0;

  for (const update of updates) {
    const nums = update.split(",");

    const res = recursion(cannotBeAfter, nums);

    if (!_.isEqual(nums, res)) {
      sum += Number(res[Math.floor(res.length / 2)]);
    }
  }

  return sum;
};
