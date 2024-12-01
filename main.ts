import fetchInput from "./fetchInput.ts";

const dayArg = Deno.args[0];
if (!dayArg) {
  console.error("Please provide the day to solve, e.g., 'deno run main.ts 1'");
  Deno.exit(1);
}

const dayNumber = Number(dayArg);
if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
  console.error("Invalid day. Please provide a number between 1 and 25.");
  Deno.exit(1);
}

const day = `day${dayNumber}`;
try {
  const { solve1, solve2 } = await import(`./solution/${day}.ts`);

  const input = await fetchInput(dayNumber);

  console.log(`Day ${dayNumber} Part1 Solution:`);
  console.log(solve1(input));
  console.log(`Day ${dayNumber} Part2 Solution:`);
  console.log(solve2(input));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`Error solving day ${dayNumber}:`, error.message);
  } else {
    console.error(`Unknown error occurred while solving day ${dayNumber}`);
  }
  Deno.exit(1);
}
