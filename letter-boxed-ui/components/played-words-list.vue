<template>
  <div class="text">
    {{ store.playedWords.length }}
    {{ store.playedWords.length === 1 ? "paraula" : "paraules" }}
  </div>
  <div class="word-list">
    <span class="word" v-for="(word, i) of store.playedWords">
      {{ word }}{{ i === store.playedWords.length - 1 ? "" : " - " }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>

<style>
.text {
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem;
  font-weight: bold;
}

.word-list {
  text-transform: uppercase;
  max-width: 20rem;
  margin: auto;
  font-size: 1.1rem;
  text-align: center;
}
</style>
