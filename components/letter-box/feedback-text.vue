<template>
  <transition>
    <div
      v-if="isVisible"
      class="feedback-text"
      :class="{ error: isError, success: !isError }"
    >
      {{ isError ? "Paraula no vàlida" : "Molt bé!" }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useGameStore, NotificationType } from "~~/store/useGameStore";

const store = useGameStore();
const isVisible = ref(false);
const isError = ref(false);
const notificationMs = 1500;

watchEffect(() => {
  isVisible.value = store.notification !== NotificationType.None;
  if (!isVisible.value) return;
  isError.value = store.notification === NotificationType.Error;
  setTimeout(() => store.hideNotification(), notificationMs);
});
</script>

<style scoped>
.feedback-text {
  background: white;
  padding: 0.3rem 0.5rem;
  border-radius: 15px;
  text-align: center;
  width: auto;
  position: absolute;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 13.7rem;
  max-width: 10rem;
  margin: auto;
}

.error {
  background-color: rgb(250, 139, 139);
}

.success {
  background-color: rgb(138, 255, 160);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
