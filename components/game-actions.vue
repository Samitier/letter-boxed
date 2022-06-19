<template>
  <div class="game-actions">
    <button @click="store.removeLastLetter()">Esborrar</button>
    <button @click="store.playWord()">Confirmar</button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";

const store = useGameStore();
</script>

<style scoped>
.game-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 0.5rem 1.3rem;
}
</style>
