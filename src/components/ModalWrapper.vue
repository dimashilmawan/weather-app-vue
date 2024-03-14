<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        class="fixed inset-0 w-full bg-black/50"
        v-if="showModal"
        @click="$emit('closeModal')"
      >
        &nbsp;
      </div>
    </Transition>

    <Transition name="modal-content">
      <Container
        class="fixed left-1/2 top-1/2 !max-w-xl -translate-x-1/2 -translate-y-1/2"
        v-if="showModal"
      >
        <div class="relative rounded-xl bg-white p-8 shadow-lg">
          <slot />
          <button @click="$emit('closeModal')" class="absolute right-2 top-2">
            <FontAwesomeIcon :icon="faCircleXmark" size="lg" />
          </button>
        </div>
      </Container>
    </Transition>
  </Teleport>
</template>
<script setup>
import { Teleport } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import Container from "./Container.vue";

defineEmits(["closeModal"]);
defineProps(["showModal"]);
</script>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-content-enter-active {
  transition-delay: 0.1s;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.9);
}
</style>
