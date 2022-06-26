import { defineStore } from "pinia";
import { removeAccents } from "~~/puzzle-generation-scripts/src/utils";
import game from "~~/assets/game.json";

export enum NotificationType {
  Error,
  Success,
  None,
}

export const useGameStore = defineStore("game", {
  state: () => ({
    date: new Date().toLocaleDateString("sv").substring(0, 10),
    letters: [] as string[][],
    possibleWords: [] as string[],
    wordsToWinCount: 0,
    playedWords: [] as string[],
    currentWord: [] as string[],
    notification: NotificationType.None,
  }),
  actions: {
    async initPuzzle() {
      let problem = game;
      try {
        problem = await import(`~~/assets/${this.date}.json`);
      } catch (e) {}
      const { letters, possibleWords, wordsToWin } = game;
      this.letters = letters;
      this.possibleWords = possibleWords;
      this.wordsToWinCount = wordsToWin.length;
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
      if (
        this.currentWord.length === 1 &&
        this.playedWordsWithoutAccents.length
      ) {
        const lastWord = removeAccents(this.playedWords.pop());
        this.currentWord = lastWord.split("");
      } else {
        this.currentWord.pop();
      }
    },
    playWord() {
      const word = this.possibleWords.find(
        (w) => removeAccents(w) === this.currentWordAsString
      );
      this.notification = word
        ? NotificationType.Success
        : NotificationType.Error;
      if (!word) return;
      this.playedWords.push(word);
      this.currentWord = [
        this.currentWordAsString.charAt(this.currentWordAsString.length - 1),
      ];
    },
    hideNotification() {
      this.notification = NotificationType.None;
    },
    resetGame() {
      this.playedWords = [];
      this.currentWord = [];
    },
  },
  getters: {
    playedWordsWithoutAccents() {
      return this.playedWords.map((w) => removeAccents(w));
    },
    playedWordsLetters() {
      return this.playedWordsWithoutAccents.reduce(
        (prev, curr) => [...prev, ...curr.split("")],
        []
      );
    },
    currentWordAsString() {
      return this.currentWord.join("");
    },
    playedLetters() {
      return new Set([...this.currentWord, ...this.playedWordsLetters]);
    },
    activeLetter() {
      return this.currentWord.length
        ? this.currentWord[this.currentWord.length - 1]
        : "";
    },
    isGameWon() {
      const totalLettersCount = this.letters.reduce(
        (total, side) => total + side.length,
        0
      );
      const playedWordsUniqueLetters = new Set([...this.playedWordsLetters]);
      return playedWordsUniqueLetters.size === totalLettersCount;
    },
  },
});
