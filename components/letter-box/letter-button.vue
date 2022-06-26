<template>
  <div class="letter" :class="{ active: isLetterActive, used: isLetterUsed }">
    <button class="letter-button" @click="addLetter()">
      {{ props.letter }}
    </button>
    <div class="dot" @click="addLetter()" />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";
import { Side } from "./side.model";

const store = useGameStore();

const props = defineProps<{
  letter: string;
  side: Side;
}>();

const isLetterUsed = computed(() => store.playedLetters.has(props.letter));
const isLetterActive = computed(() => store.activeLetter === props.letter);

function addLetter() {
  store.addLetter(props.letter);
}
</script>

<style scoped>
.letter {
  position: relative;
}

.letter-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  text-transform: uppercase;
  cursor: pointer;
  padding: 1rem;
  width: 4rem;
  user-select: none;
}
.letter-button:active {
  opacity: 0.5;
}

.dot {
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: -0.7rem;
  left: 0;
  right: 0;
  width: 1.1rem;
  height: 1.1rem;
  margin: auto;
  border: 2px solid black;
  cursor: pointer;
}

.used .letter-button {
  color: black;
}
.used .dot {
  background-color: black;
}
.active .letter-button {
  font-weight: bold;
  color: #b3005d;
}
.active .dot {
  background-color: #b3005d;
}
.right .letter-button {
  transform: rotateZ(-90deg);
}
.bottom .letter {
  transform: rotateZ(180deg);
}
.bottom .dot {
  top: -0.7rem;
  bottom: auto;
}
.left .letter-button {
  transform: rotateZ(90deg);
}
</style>
