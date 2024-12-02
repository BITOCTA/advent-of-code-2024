# Advent of Code Solutions with Deno

This project provides solutions for
[Advent of Code 2024](https://adventofcode.com/2024) using Deno. Each day's
solution consists of two parts (`solve1` and `solve2`) implemented in
TypeScript. The input for each day is fetched dynamically from the Advent of
Code website and cached locally.

## Features

- Fetches and caches input files dynamically.
- Implements solutions for both parts of each day's problem.
- Supports debugging with Visual Studio Code.
- Modular and scalable structure.

## Project Structure

```
advent-of-code/
├── .vscode/
│   └── launch.json     # Sample config for debugging
├── fetchInput.ts       # Fetches and caches input files
├── input/              # Cached input files
├── main.ts             # Entry point for running solutions
├── solution/           # Contains solutions for each day
│   ├── day1.ts         # Example solution for Day 1
│   ├── day2.ts         # Example solution for Day 2
│   └── ...
├── config.ts           # Stores configuration like session cookie
└── README.md           # Project documentation
```

## Setup

### Prerequisites

- [Deno](https://deno.land/) installed.
- A valid session cookie for Advent of Code (retrieved from your browser while
  logged in).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd advent-of-code
   ```

2. Add your session cookie to `.env` file:

   - **Using `.env`**:
     ```dotenv
     SESSION_COOKIE=your-session-cookie-here
     ```

3. Install required permissions for Deno.

## Usage

1. Run a solution for a specific day:
   ```bash
   deno run --allow-net --allow-read --allow-write main.ts <day>
   ```
   Replace `<day>` with the day number (1–25). Example:
   ```bash
   deno run --allow-net --allow-read --allow-write main.ts 1
   ```

2. Debugging:
   - Use Visual Studio Code with the provided `launch.json` configuration.
   - Update the `args` in `launch.json` to provide the day as a command-line
     argument.

## Adding Solutions

1. Create a new file in the `solution/` directory for the day (e.g., `day3.ts`).
2. Export two functions, `solve1` and `solve2`, which take the day's input as a
   string and return the solution for part 1 and part 2, respectively:
   ```typescript
   export const solve1 = (input: string): number => {
     // Your solution for part 1
   };

   export const solve2 = (input: string): number => {
     // Your solution for part 2
   };
   ```
3. The `main.ts` file will automatically pick up the new solution file when you
   run it.

## Example

### Input (`input/day1.txt`)

```
3   4
4   3
2   5
1   3
3   9
3   3
```

### Solution (`solution/day1.ts`)

```typescript
export const solve1 = (input: string): number => {
  const [arr1, arr2]: [number[], number[]] = [[], []];
  const inputSplitted = input.split(/\r?\n|\r|\n/g);
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

  const inputSplitted = input.split(/\r?\n|\r|\n/g);

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
```

### Running the Solution

```bash
deno run --allow-read --allow-env --allow-net --allow-write main.ts 1
```

### Output

```
Using cached input for day 1
Day 1 Part1 Solution:
11
Day 1 Part2 Solution:
31
```

## License

This project is open-source and available under the MIT License.
