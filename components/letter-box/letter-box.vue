<template>
  <div class="container-box">
    <div class="side" :class="getSide(i)" v-for="(side, i) of store.letters">
      <letter-button
        v-for="letter of side"
        :letter="letter"
        :side="getSide(i)"
      />
    </div>
    <letter-box-line-canvas class="canvas" />
  </div>
</template>

<script setup lang="ts">
import { getSideFromIndex } from "./side.model";
import { useGameStore } from "~~/store/useGameStore";

const store = useGameStore();

function getSide(index: number) {
  return getSideFromIndex(index);
}
</script>

<style scoped>
.container-box {
  height: 30rem;
  width: 30rem;
  padding-left: 5rem;
  margin: auto;
}

.side {
  width: 20rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 5px solid black;
  padding: 1rem 2rem 0 2rem;
  position: absolute;
}
.right {
  transform: rotateZ(90deg) translateY(-12.5rem) translateX(12.5rem);
}
.bottom {
  transform: translateY(25rem) rotateZ(180deg);
}
.left {
  transform: rotateZ(-90deg) translateY(-12.5rem) translateX(-12.5rem);
}

.canvas {
  width: 20rem;
  height: 20rem;
  margin-top: 5.3rem;
  border: 5px solid transparent;
}
</style>
