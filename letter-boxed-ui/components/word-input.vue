<template>
  <div class="container-box">
    <div class="side" v-for="side of store.letters">
      <div class="letter" v-for="letter of side">
        <button>{{ letter }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore.";

const store = useGameStore();
</script>

<style scoped>
.container-box {
  width: 300px;
  height: 300px;
  margin: 0;
  padding: 50px;
}
.side {
  width: 300px;
  display: flex;
  justify-content: space-between;
  border-bottom: 5px solid black;
  padding: 1.5rem;
  position: absolute;
}
.side:nth-child(2) {
  transform: translateX(300px) rotateZ(90deg);
  transform-origin: center center;
}
.side:nth-child(3) {
  transform: translateY(300px);
  transform-origin: center center;
}
.side:nth-child(4) {
  transform: translateX(-150px) rotateZ(-90deg);
  transform-origin: center center;
}
</style>
