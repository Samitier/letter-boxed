import { defineStore } from "pinia";
import game from "../puzzle-generation-scripts/game.json";

enum GameState {
  Lost,
  Won,
  Playing,
}

export const useGameStore = defineStore("game", {
  state: () => ({
    letters: [] as string[][],
    possibleWords: [] as string[],
    gameState: GameState.Playing,
    playedWords: [] as string[],
    currentWord: [] as string[],
  }),
  actions: {
    initPuzzle() {
      const { letters, possibleWords } = game;
      this.letters = letters;
      this.possibleWords = possibleWords;
    },
    addLetter(letter: string) {
      const currentSide = this.letters.findIndex((side) =>
        side.includes(letter)
      );
      let isCorrect = false;
      if (!this.currentWord.length) {
        isCorrect = !this.lastPlayedLetter || this.lastPlayedLetter === letter;
      } else {
        isCorrect = !this.letters[currentSide].includes(
          this.currentWord[this.currentWord.length - 1]
        );
      }
      if (!isCorrect) return;
      this.currentWord.push(letter);
    },
    removeLastLetter() {
      this.currentWord.pop();
    },
    playWord() {
      if (!this.possibleWords.includes(this.currentWordAsString)) {
        return;
      }
      this.playedWords.push(this.currentWordAsString);
      this.currentWord = [
        this.currentWordAsString.charAt(this.currentWordAsString.length - 1),
      ];
      const totalLettersCount = this.letters.reduce(
        (total, side) => total + side.length,
        0
      );
      if (this.playedLetters.size === totalLettersCount) {
        this.gameState = GameState.Won;
      }
    },
  },
  getters: {
    currentWordAsString() {
      return this.currentWord.join("");
    },
    playedLetters() {
      return new Set([
        ...this.currentWord,
        ...this.playedWords.reduce(
          (prev, curr) => [...prev, ...curr.split("")],
          []
        ),
      ]);
    },
    activeLetter() {
      return this.currentWord.length
        ? this.currentWord[this.currentWord.length - 1]
        : "";
    },
    isGameWon() {
      return this.gameState === GameState.Won;
    },
  },
});
