<template>
  <h1>Welcome to the Letter boxed game</h1>
  <div class="container">
    <div>
      <word-input />
      <played-words-list />
    </div>
    <letter-box />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const myVar = ref("A");

const myVariableThatReactsToMyVar = computed(() => {
  return myVar.value + "hola";
});

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
