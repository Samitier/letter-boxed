<template>
  <game-won-message />
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
import { useGameStore } from "~~/store/useGameStore";

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
  margin: 0;
}
html,
body,
#__nuxt {
  height: 100%;
}

@media screen and (max-width: 700px) {
  html {
    font-size: 14px;
  }
}
@media screen and (max-width: 420px) {
  html {
    font-size: 12px;
  }
}
</style>

<style scoped>
.container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 1000px;
  margin: auto;
  padding: 0.5rem;
}

@media screen and (max-width: 700px) {
  body {
    font-size: 5px;
  }
  .container {
    grid-template-columns: 1fr;
    height: auto;
    gap: 3rem;
    padding: 5rem 0.5rem;
  }
}
</style>
