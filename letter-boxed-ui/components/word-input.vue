<template>
  <div class="word-input">{{ store.currentWordAsString }}</div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>

<style scoped>
.word-input {
  font-weight: bold;
  font-size: 35px;
  border-bottom: 5px solid black;
  text-align: center;
  text-transform: uppercase;
}
</style>
