export const defaultSides = 4;
export const defaultLettersPerSide = 3;

export const puzzleInitValue = {
  letters: [] as string[][],
  possibleWords: [] as string[],
  wordsToWin: [],
};

export type Puzzle = typeof puzzleInitValue;
