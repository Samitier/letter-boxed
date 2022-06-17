<template>
  <h1>Welcome to the Letter boxed game</h1>
  <div class="container">
    <div>
      <word-input />
      <played-words-list />
    </div>
    <div>
      <letter-box />
      <game-actions />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();

onMounted(() => {
  store.initPuzzle();
});
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  background: #faa6a4;
}
</style>

<style scoped>
.container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}
</style>
