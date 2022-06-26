<template>
  <div v-if="!store.isGameWon" class="text">
    Has trobat {{ numberOfWordsText }}
  </div>
  <div v-else class="text">
    Has guanyat amb {{ numberOfWordsText }}. Felicitats!
  </div>
  <div class="word-list">
    <span class="word" v-for="(word, i) of store.playedWords">
      {{ word }}{{ i === store.playedWords.length - 1 ? "" : " - " }}</span
    >
  </div>
  <div v-if="!store.isGameWon" class="small-text">
    Intenta resoldre-ho en {{ store.wordsToWinCount }} paraules o menys.
  </div>
  <div
    v-else-if="store.playedWords.length > store.wordsToWinCount"
    class="small-text"
  >
    Ara intenta resoldre-ho amb {{ store.wordsToWinCount }} paraules o menys.
    <br />
    <a class="reset" href="#" @click="store.resetGame()"
      >Torna a intentar-ho.</a
    >
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";

const store = useGameStore();

const numberOfWordsText = computed(
  () =>
    `${store.playedWords.length} ${
      store.playedWords.length === 1 ? "paraula" : "paraules"
    }`
);
</script>

<style>
.text {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 0.5rem;
}

.word-list {
  text-transform: uppercase;
  max-width: 20rem;
  margin: 1rem auto;
  font-size: 1.1rem;
  text-align: center;
}

.small-text {
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}
</style>
