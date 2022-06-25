import { defineStore } from "pinia";
import { removeAccents } from "~~/puzzle-generation-scripts/src/utils";
import game from "~~/assets/game.json";

enum GameState {
  Won,
  Playing,
}

export const useGameStore = defineStore("game", {
  state: () => ({
    letters: [] as string[][],
    possibleWords: [] as string[],
    wordsToWinCount: 0,
    gameState: GameState.Playing,
    playedWords: [] as string[],
    currentWord: [] as string[],
  }),
  actions: {
    initPuzzle() {
      const { letters, possibleWords, wordsToWinCount } = game;
      this.letters = letters;
      this.possibleWords = possibleWords;
      this.wordsToWinCount = wordsToWinCount;
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
      if (this.currentWord.length === 1 && this.playedWords.length) {
        const lastWord = this.playedWords.pop();
        this.currentWord = lastWord.split("");
      } else {
        this.currentWord.pop();
      }
    },
    playWord() {
      const word = this.possibleWords.find(
        (w) => removeAccents(w) === this.currentWordAsString
      );
      if (!word) return;
      this.playedWords.push(word);
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
