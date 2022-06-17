<template>
  <div class="container-box">
    <div class="side" v-for="side of store.letters">
      <div
        v-for="letter of side"
        class="letter"
        :class="{ active: isLetterActive(letter), used: isLetterUsed(letter) }"
      >
        <button class="letter-button" @click="store.addLetter(letter)">
          {{ letter }}
        </button>
        <div class="dot" @click="store.addLetter(letter)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";

const store = useGameStore();

// FIXME: if we move letter to a component, this can be a computed
function isLetterUsed(letter: string) {
  return store.playedLetters.has(letter);
}

function isLetterActive(letter: string) {
  return store.activeLetter === letter;
}
</script>

<style scoped>
.container-box {
  height: 490px;
  width: 490px;
  padding-left: 5rem;
  margin: auto;
}
.letter {
  position: relative;
}

.letter-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 35px;
  text-transform: uppercase;
  cursor: pointer;
}
.letter-button:active {
  opacity: 0.5;
}

.side {
  width: 330px;
  display: flex;
  justify-content: space-between;
  border-bottom: 5px solid black;
  padding: 1rem 2rem;
  position: absolute;
}
.side:nth-child(2) {
  transform: rotateZ(90deg) translateY(-200px) translateX(200px);
}
.side:nth-child(3) {
  transform: translateY(400px) rotateZ(180deg);
}

.side:nth-child(3) .letter {
  transform: rotateZ(180deg);
}
.side:nth-child(3) .dot {
  top: -1.65rem;
  bottom: auto;
}
.side:nth-child(4) {
  transform: rotateZ(-90deg) translateY(-200px) translateX(-200px);
}
.dot {
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: -1.65rem;
  left: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  margin: auto;
  border: 2px solid black;
}

.letter.used .letter-button {
  color: black;
}

.letter.active .dot {
  background-color: black;
}
.letter.active .letter-button {
  font-weight: bold;
}
</style>
