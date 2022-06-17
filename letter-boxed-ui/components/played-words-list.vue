<template>
  {{ store.playedWords }}
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>
