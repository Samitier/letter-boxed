<template>
  <div v-if="store.isGameWon" class="game-won-message">You Won!</div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>
