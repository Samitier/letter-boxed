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
  margin-left: 100px;
  padding: 50px;
  position: relative;
}

.container-box .side button {
  background: transparent;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 35px;
  text-transform: uppercase;
  cursor: pointer;
}
.container-box .side button:active {
  opacity: 0.5;
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
  transform:  rotateZ(90deg) translateY(-200px) translateX(200px);
}
.side:nth-child(3) {
  transform: translateY(400px) rotateZ(180deg);
}

.side:nth-child(3) .letter {
  transform: rotateZ(180deg)
}
.side:nth-child(4) {
  transform: rotateZ(-90deg)  translateY(-200px) translateX(-200px);
}
</style>
