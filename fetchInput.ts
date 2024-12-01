import { SESSION_COOKIE } from "./config.ts";

async function fileExists(path: string): Promise<boolean> {
    try {
        const stat = await Deno.stat(path);
        return stat.isFile;
    } catch {
        return false;
    }
}

async function fetchInput(day: number): Promise<string> {
    const inputFilePath = `./input/day${day}.txt`;

    if (await fileExists(inputFilePath)) {
        console.log(`Using cached input for day ${day}`);
        return await Deno.readTextFile(inputFilePath);
    }

    console.log(`Fetching input for day ${day}...`);
    const response = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
        headers: {
            "Cookie": `session=${SESSION_COOKIE}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch input for day ${day}: ${response.statusText}`);
    }

    const input = await response.text();

    await Deno.writeTextFile(inputFilePath, input);
    console.log(`Input for day ${day} saved to ${inputFilePath}`);

    return input;
}

export default fetchInput;