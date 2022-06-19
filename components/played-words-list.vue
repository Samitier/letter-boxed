<template>
  <div class="text">
    Has trobat {{ store.playedWords.length }}
    {{ store.playedWords.length === 1 ? "paraula" : "paraules" }}
  </div>
  <div class="word-list">
    <span class="word" v-for="(word, i) of store.playedWords">
      {{ word }}{{ i === store.playedWords.length - 1 ? "" : " - " }}</span
    >
  </div>
  <div class="small-text">
    Intenta resolde-ho en {{ store.wordsToWinCount }} paraules.
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";

const store = useGameStore();
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
