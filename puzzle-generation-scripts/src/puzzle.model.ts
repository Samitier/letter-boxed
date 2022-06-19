export const defaultSides = 4;
export const defaultLettersPerSide = 3;

export const puzzleInitValue = {
  letters: [] as string[][],
  possibleWords: [] as string[],
  wordsToWinCount: 0,
};

export type Puzzle = typeof puzzleInitValue;
