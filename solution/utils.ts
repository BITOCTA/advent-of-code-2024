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
};

/**
 * Splits a given string into an array of lines and further splits them into two groups divided by an empty line.
 *
 * This function handles different types of newline characters:
 * - `\n` (Unix/Linux)
 * - `\r\n` (Windows)
 * - `\r` (Old Mac systems)
 *
 * @param {string} t - The input string to be split into lines and grouped.
 * @returns {[string[], string[]]} - A tuple with two arrays:
 *                                    - The first group (lines before the empty line)
 *                                    - The second group (lines after the empty line)
 *
 * @example
 * const input = "line1\nline2\n\nline3\nline4";
 * const [group1, group2] = splitAndGroupByEmptyLine(input);
 * console.log(group1); // ["line1", "line2"]
 * console.log(group2); // ["line3", "line4"]
 */

export const splitAndGroupByEmptyLine = (t: string): [string[], string[]] => {
  const lines = splitLines(t);
  const emptyLineIndex = lines.indexOf("");

  if (emptyLineIndex === -1) {
    return [lines, []];
  }

  const group1 = lines.slice(0, emptyLineIndex);
  const group2 = lines.slice(emptyLineIndex + 1);

  return [group1, group2];
};
