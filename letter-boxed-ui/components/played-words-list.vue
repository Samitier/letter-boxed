<template>
  <div class="text">
    {{ store.playedWords.length }}
    {{ store.playedWords.length === 1 ? "word" : "words" }}
  </div>
  <div class="word-list">
    <div class="word" v-for="word of store.playedWords">{{ word }}</div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>
