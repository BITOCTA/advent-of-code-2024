export const solve1 = (input: string): number => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  return Array.from(input.matchAll(regex))
    .reduce((sum, match) => {
      const [_, arg1, arg2] = match;
      return sum + Number(arg1) * Number(arg2);
    }, 0);
};

export const solve2 = (input: string): number => {
  const regex = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

  let enable = true;

  return Array.from(input.matchAll(regex))
    .reduce((sum, match) => {
      if (match[1] === `do()`) {
        enable = true;
      } else if (match[1] === `don't()`) {
        enable = false;
      } else {
        if (enable) {
          return sum + Number(match[2]) * Number(match[3]);
        }
      }
      return sum;
    }, 0);
};
