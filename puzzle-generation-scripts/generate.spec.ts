import { assertEquals } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import {
  initPuzzle,
  defaultLettersPerSide,
  defaultSides,
  Puzzle,
  getPossibleWords,
  getSolvableIn,
} from "./generate.ts";

// Deno.test("Should generate empty puzzle correctly", () => {
//   const emptyPuzzle = initPuzzle();
//   assertEquals(emptyPuzzle.letters.length, defaultSides);
//   assertEquals(
//     emptyPuzzle.letters.some((side) => side.length !== defaultLettersPerSide),
//     false
//   );
//   assertEquals(emptyPuzzle.solvableIn, 0);
//   assertEquals(emptyPuzzle.possibleWords.length, 0);

//   const allLetters = emptyPuzzle.letters.reduce(
//     (lettersAcc, letters) => [...lettersAcc, ...letters],
//     [] as string[]
//   );
//   const uniqueLetters = new Set(allLetters);
//   console.log(allLetters, uniqueLetters);
//   assertEquals(allLetters.length, uniqueLetters.size);
// });

// Deno.test("Should get all possible words", async () => {
//   const puzzle: Puzzle = {
//     letters: [["g"], ["a"], ["t"]],
//     solvableIn: 0,
//     possibleWords: [],
//   };

//   assertEquals(await getPossibleWords(puzzle), [
//     "gag",
//     "gat",
//     "gata",
//     "tat",
//     "tata",
//   ]);
// });

// Deno.test("Should get possible words without repeating side", async () => {
//   const puzzleWithoutSolution: Puzzle = {
//     letters: [["g", "a", "t"], ["o"]],
//     solvableIn: 0,
//     possibleWords: [],
//   };

//   assertEquals(await getPossibleWords(puzzleWithoutSolution), [
//     "goa",
//     "got",
//     "to",
//     "tot",
//   ]);
// });

Deno.test("Should get min number of words to win game", async () => {
  const puzzle: Puzzle = {
    letters: [
      ["g", "a"],
      ["o", "i"],
      ["s", "t"],
    ],
    solvableIn: 0,
    possibleWords: [],
  };

  puzzle.possibleWords = await getPossibleWords(puzzle);
  assertEquals(await getSolvableIn(puzzle), 2);
});

// Deno.test("Should get Infinity movements if game is not winnable", async () => {
//   const puzzle: Puzzle = {
//     letters: [["g", "a", "t"], ["o"]],
//     solvableIn: 0,
//     possibleWords: [],
//   };

//   puzzle.possibleWords = await getPossibleWords(puzzle);

//   assertEquals(await getSolvableIn(puzzle), Infinity);
// });
