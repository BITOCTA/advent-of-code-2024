/**
 * Splits a given string into an array of lines.
 * 
 * This function handles different types of newline characters:
 * - `\n` (Unix/Linux)
 * - `\r\n` (Windows)
 * - `\r` (Old Mac systems)
 * 
 * @param {string} t - The input string to be split into lines.
 * @returns {string[]} - An array of strings, each representing a line from the input.
 * 
 * @example
 * // Example usage:
 * const input = "line1\nline2\r\nline3\r";
 * const lines = splitLines(input);
 * console.log(lines); 
 * // Output: ["line1", "line2", "line3"]
 */
export const splitLines = (t: string) => {
    return t.split(/\r?\n|\r|\n/g);
}