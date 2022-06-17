<template>
  <button @click="store.removeLastLetter()">Delete</button>
  <button @click="store.playWord()">Enter</button>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>
