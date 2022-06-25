import { defaultSides, defaultLettersPerSide, Puzzle } from "./puzzle.model.ts";
import {
  getRandomChar,
  getRandomValueOfArray,
  removeAccents,
} from "./utils.ts";

async function getWordList() {
  return (await Deno.readTextFile("./assets/catalan-dictionary.txt"))
    .split(/\n/g)
    .reduce((words, word) => words.add(word), new Set<string>());
}

function getRandomPuzzleLetters(sides: number, lettersPerSide: number) {
  const letters: string[][] = [];

  for (let i = 0; i < sides; ++i) {
    const sideLetters: string[] = [];
    letters.push(sideLetters);
    for (let j = 0; j < lettersPerSide; ++j) {
      const randomChar = getRandomChar();
      if (letters.some((s) => s.includes(randomChar))) {
        --j;
      } else sideLetters.push(randomChar);
    }
  }

  return letters;
}

function getPossibleWords(letters: string[][] = [], wordList: string[]) {
  const possibleWords: string[] = [];

  for (const word of wordList) {
    let isWinnable = true;
    let lastSide = -1;
    const wordWithoutAccents = removeAccents(word);
    for (const letter of wordWithoutAccents) {
      const currentSide = letters.findIndex((l) => l.includes(letter));
      isWinnable = currentSide !== -1 && lastSide !== currentSide;
      lastSide = currentSide;
      if (!isWinnable) break;
    }
    if (isWinnable) possibleWords.push(word);
  }

  return possibleWords;
}

function getWordsToWinCount(
  letters: string[][],
  possibleWords: string[],
  amountOfPlays = 200,
  threshold = 15
) {
  const wordsToWin = [];
  for (let i = 0; i < amountOfPlays; ++i) {
    let unvisitedWords = [...possibleWords.map((w) => removeAccents(w))];
    let unvisitedLetters = letters.reduce(
      (lettersAcc, letters) => [...lettersAcc, ...letters],
      [] as string[]
    );
    let wordCount = 0;
    let word = "";
    let nextPossibleWords = unvisitedWords;
    while (
      unvisitedLetters.length > 0 &&
      unvisitedWords.length > 0 &&
      nextPossibleWords.length > 0
    ) {
      word = getRandomValueOfArray(nextPossibleWords);
      unvisitedWords = unvisitedWords.filter((w) => w !== word);
      unvisitedLetters = unvisitedLetters.filter((l) => !word.includes(l));
      nextPossibleWords = unvisitedWords.filter((w) =>
        w.startsWith(word.charAt(word.length - 1))
      );
      ++wordCount;
    }
    if (!unvisitedLetters.length) wordsToWin.push(wordCount);
  }
  if (!wordsToWin.length) wordsToWin.push(0);
  const total = Math.min(...wordsToWin);
  if (total > threshold) return 0;
  return total;
}

function generatePuzzle(
  wordList: string[],
  sides = defaultSides,
  lettersPerSide = defaultLettersPerSide
) {
  const letters = getRandomPuzzleLetters(sides, lettersPerSide);
  const possibleWords = getPossibleWords(letters, wordList);
  const wordsToWinCount = getWordsToWinCount(letters, possibleWords);
  const puzzle: Puzzle = {
    letters,
    possibleWords,
    wordsToWinCount,
  };
  return puzzle;
}

export async function generatePuzzleFile() {
  const wordList = await getWordList();
  console.log("Starting puzzle generation...");
  let puzzle: Puzzle;
  while (true) {
    console.log(" - Trying new letter combinations...");
    puzzle = await generatePuzzle(wordList);
    if (puzzle.wordsToWinCount > 0) {
      await Deno.writeTextFile("../assets/game.json", JSON.stringify(puzzle));
      break;
    }
    console.log(" - The puzzle is not winnable :(");
  }
  console.log(" - Puzzle generated successfully :)");
}
