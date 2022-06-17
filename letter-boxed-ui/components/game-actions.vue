<template>
  <div class="game-actions">
    <button @click="store.removeLastLetter()">Delete</button>
    <button @click="store.playWord()">Enter</button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>

<style scoped>
.game-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
