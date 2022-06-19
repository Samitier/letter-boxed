<template>
  <div class="word-input">{{ store.currentWordAsString }}</div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";

const store = useGameStore();
</script>

<style scoped>
.word-input {
  font-weight: bold;
  font-size: 2rem;
  min-height: 2.5rem;
  border-bottom: 3px solid black;
  text-align: center;
  text-transform: uppercase;
  max-width: 22rem;
  margin: auto;
}
</style>
