<template>
  <div class="container-box">
    <div class="side" v-for="side of store.letters">
      <div class="letter" v-for="letter of side">
        <button
          class="letter-button"
          :class="{ used: isLetterUsed(letter) }"
          @click="store.addLetter(letter)"
        >
          {{ letter }}
        </button>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();

// FIXME: if we move letter to a component, this can be a computed
function isLetterUsed(letter: string) {
  return store.playedLetters.has(letter);
}
</script>

<style scoped>
.container-box {
  height: 600px;
  margin-left: 100px;
  padding: 50px;
  position: relative;
}

.letter-button {
  background: transparent;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 35px;
  text-transform: uppercase;
  cursor: pointer;
}
.letter-button:active {
  opacity: 0.5;
}

.side {
  width: 300px;
  display: flex;
  justify-content: space-between;
  border-bottom: 5px solid black;
  padding: 1.5rem;
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
.side:nth-child(4) {
  transform: rotateZ(-90deg) translateY(-200px) translateX(-200px);
}
.letter-button.used {
  color: black;
}
.dot {
  border-radius: 50%;
  background-color: black;
  width: 1rem;
  height: 1rem;
  margin: auto;
}
</style>
