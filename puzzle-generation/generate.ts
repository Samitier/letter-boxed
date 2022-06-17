export const defaultSides = 4;
export const defaultLettersPerSide = 3;
const chars = "abcdefghijklmnopqrstuvwxyz";

const puzzleInitValue = {
  letters: [] as string[][],
  solvableIn: 0,
  possibleWords: [] as string[],
};
export type Puzzle = typeof puzzleInitValue;

async function getWords() {
  return (await Deno.readTextFile("./catalan-dictionary.txt"))
    .split(/\n/g)
    .reduce((words, word) => words.add(word), new Set<string>());
}

function getRandomPuzzleLetters(sides: number, lettersPerSide: number) {
  const letters: string[][] = [];
  for (let i = 0; i < sides; ++i) {
    const sideLetters: string[] = [];
    letters.push(sideLetters);
    for (let j = 0; j < lettersPerSide; ++j) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      if (letters.some((s) => s.includes(randomChar))) {
        --j;
      } else sideLetters.push(randomChar);
    }
  }
  return letters;
}

export function getEmptyPuzzle(
  sides = defaultSides,
  lettersPerSide = defaultLettersPerSide
): Puzzle {
  return {
    ...puzzleInitValue,
    letters: getRandomPuzzleLetters(sides, lettersPerSide),
  };
}

export async function getPossibleWords(puzzle: Puzzle) {
  const words = await getWords();
  const possibleWords: string[] = [];

  for (const word of words) {
    let isWinnable = true;
    let lastSide = -1;
    for (const letter of word) {
      const currentSide = puzzle.letters.findIndex((l) => l.includes(letter));
      isWinnable = currentSide !== -1 && lastSide !== currentSide;
      lastSide = currentSide;
      if (!isWinnable) break;
    }
    if (isWinnable) possibleWords.push(word);
  }

  return possibleWords;
}

export function getSolvableIn(puzzle: Puzzle) {
  const allLetters = puzzle.letters.reduce(
    (lettersAcc, letters) => [...lettersAcc, ...letters],
    [] as string[]
  );
  return Math.min(
    ...puzzle.possibleWords
      .map((word) => {
        const unvisitedWords = puzzle.possibleWords.filter((w) => w !== word);
        const unvisitedLetters = allLetters.filter((l) => !word.includes(l));
        return getNeededWords(unvisitedWords, unvisitedLetters, 1, word);
      })
      .filter((numberOfWords) => numberOfWords > 0)
  );
}

const maxDepth = 1;
function getNeededWords(
  remainingWords: string[],
  remainingLetters: string[],
  stepCount: number,
  currentWord: string
): number {
  if (stepCount >= maxDepth) return -1;
  if (!remainingLetters.length) return stepCount;
  if (!remainingWords.length) return 0;

  const lastLetterOfCurrentWord = currentWord.charAt(currentWord.length - 1);
  const nextWords = remainingWords.filter((w) =>
    w.startsWith(lastLetterOfCurrentWord)
  );
  return Math.min(
    ...nextWords
      .map((word) => {
        const unvisitedWords = remainingWords.filter((w) => w !== word);
        const unvisitedLetters = remainingLetters.filter(
          (l) => !word.includes(l)
        );
        return getNeededWords(
          unvisitedWords,
          unvisitedLetters,
          stepCount + 1,
          word
        );
      })
      .filter((numberOfWords) => numberOfWords > 0)
  );
}

async function initPuzzle() {
  let puzzle = getEmptyPuzzle();
  puzzle.possibleWords = await getPossibleWords(puzzle);
  for (let i = 0; i < 15; ++i) {
    console.log("start puzzle generation");
    const puzzle1 = getEmptyPuzzle();
    puzzle.possibleWords = await getPossibleWords(puzzle);
    if (puzzle1.possibleWords.length > puzzle.possibleWords.length)
      puzzle = puzzle1;
  }
  await Deno.writeTextFile("./game.json", JSON.stringify(puzzle));
  return puzzle;
}

console.log(await initPuzzle());
