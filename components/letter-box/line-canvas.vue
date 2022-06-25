<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { useGameStore } from "~~/store/useGameStore";
import { getSideFromIndex, Side } from "./side.model";

const store = useGameStore();
const canvas = ref<HTMLCanvasElement>();
const resolution = 1000;
const lineWidth = 15;
const padding = 188;
const dottedLineStep = 35;
const lineColor = "#b3005d";
const dottedLineColor = "#de7c7c";
const context = computed(() => canvas.value?.getContext("2d"));

onMounted(() => {
  if (!context.value) return;
  canvas.value.width = resolution;
  canvas.value.height = resolution;
  context.value.lineWidth = lineWidth;
});

watchEffect(() => {
  clearCanvas();
  for (let word of store.playedWords) {
    for (let i = 1; i < word.length; ++i) {
      const isDotted = false;
      renderPath(word.charAt(i - 1), word.charAt(i), isDotted);
    }
  }
  for (let i = 1; i < store.currentWord.length; ++i) {
    const isDotted = true;
    renderPath(store.currentWord[i - 1], store.currentWord[i], isDotted);
  }
});

function clearCanvas() {
  if (!context.value) return;
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
}

function renderPath(letterFrom: string, letterTo: string, isDotted = false) {
  if (!context.value) return;
  const [fromX, fromY] = getLetterCoordinates(letterFrom);
  const [toX, toY] = getLetterCoordinates(letterTo);

  context.value.beginPath();
  context.value.strokeStyle = isDotted ? dottedLineColor : lineColor;
  context.value.setLineDash([isDotted ? dottedLineStep : 0]);
  context.value.moveTo(fromX, fromY);
  context.value.lineTo(toX, toY);
  context.value.stroke();
}

function getLetterCoordinates(letter: string) {
  const sideIndex = store.letters.findIndex((side) => side.includes(letter));
  const dotIndex = store.letters[sideIndex].findIndex((l) => l === letter);

  let x: number = padding;
  if (dotIndex === 1) x = resolution / 2;
  if (dotIndex === 2) x = resolution - padding;

  switch (getSideFromIndex(sideIndex)) {
    case Side.top:
      return [x, 0];
    case Side.right:
      return [resolution, x];
    case Side.bottom:
      // We need to take into account the transform rotate:
      return [resolution - x, resolution];
    case Side.left:
      // We need to take into account the transform rotate:
      return [0, resolution - x];
  }
}
</script>
