import { splitLines } from "./utils.ts";

const targetWord = "XMAS";

const directions = [
  { rowDelta: 0, colDelta: 1 }, // Horizontal (right)
  { rowDelta: 0, colDelta: -1 }, // Horizontal (left)
  { rowDelta: 1, colDelta: 0 }, // Vertical (down)
  { rowDelta: -1, colDelta: 0 }, // Vertical (up)
  { rowDelta: 1, colDelta: 1 }, // Diagonal (down-right)
  { rowDelta: 1, colDelta: -1 }, // Diagonal (down-left)
  { rowDelta: -1, colDelta: 1 }, // Diagonal (up-right)
  { rowDelta: -1, colDelta: -1 }, // Diagonal (up-left)
];

const checkWord = (
  rows: string[],
  startRow: number,
  startCol: number,
  rowDelta: number,
  colDelta: number,
  word: string,
): boolean => {
  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * rowDelta;
    const col = startCol + i * colDelta;

    if (
      row < 0 ||
      col < 0 ||
      row >= rows.length ||
      col >= rows[0].length ||
      rows[row][col] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};

const countOccurrences = (rows: string[], word: string): number => {
  let count = 0;

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      for (const { rowDelta, colDelta } of directions) {
        if (checkWord(rows, row, col, rowDelta, colDelta, word)) {
          count++;
        }
      }
    }
  }

  return count;
};

const checkXMAS = (
  rows: string[],
  centerRow: number,
  centerCol: number,
): boolean => {
  const topLeftToBottomRight = rows[centerRow - 1]?.[centerCol - 1] +
    rows[centerRow]?.[centerCol] +
    rows[centerRow + 1]?.[centerCol + 1];
  const topRightToBottomLeft = rows[centerRow - 1]?.[centerCol + 1] +
    rows[centerRow]?.[centerCol] +
    rows[centerRow + 1]?.[centerCol - 1];

  const validDiagonal1 = topLeftToBottomRight === "MAS" ||
    topLeftToBottomRight === "SAM";
  const validDiagonal2 = topRightToBottomLeft === "MAS" ||
    topRightToBottomLeft === "SAM";

  return validDiagonal1 && validDiagonal2;
};

const countXMASPatterns = (rows: string[]): number => {
  let count = 0;

  for (let row = 1; row < rows.length - 1; row++) {
    for (let col = 1; col < rows[row].length - 1; col++) {
      if (rows[row]?.[col] === "A" && checkXMAS(rows, row, col)) {
        count++;
      }
    }
  }

  return count;
};

export const solve1 = (input: string): number => {
  const rows = splitLines(input);
  const occurrences = countOccurrences(rows, targetWord);
  return occurrences;
};

export const solve2 = (input: string): number => {
  const rows = splitLines(input);
  const occurrences = countXMASPatterns(rows);
  return occurrences;
};
