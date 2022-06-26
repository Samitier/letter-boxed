<template>
  <div class="container-box" :class="{ animate: isAnimating }">
    <div class="side" :class="getSide(i)" v-for="(side, i) of store.letters">
      <letter-button
        v-for="letter of side"
        :letter="letter"
        :side="getSide(i)"
      />
    </div>
    <letter-box-line-canvas class="canvas" />
    <letter-box-feedback-text />
  </div>
</template>

<script setup lang="ts">
import { getSideFromIndex } from "./side.model";
import { useGameStore, NotificationType } from "~~/store/useGameStore";

const store = useGameStore();
const animationMs = 150;
const isAnimating = ref(false);

function getSide(index: number) {
  return getSideFromIndex(index);
}

watchEffect(() => {
  if (store.notification === NotificationType.None) return;
  isAnimating.value = true;
  setTimeout(() => (isAnimating.value = false), animationMs);
});
</script>

<style scoped>
.container-box {
  height: 30rem;
  width: 30rem;
  padding-left: 5rem;
  margin: auto;
  position: relative;
  transition: transform 0.15s linear;
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

.animate {
  transform: scale(1.1);
}
</style>
