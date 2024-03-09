<template>
  <header>
    <nav class="flex h-16 items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3"
        ><i class="fa-solid fa-cloud-sun text-3xl"></i>
        <p>Local Weather</p></RouterLink
      >
      <div class="flex items-center gap-3">
        <button @click="toggleModal">
          <i class="fa-solid fa-circle-info text-2xl"></i>
        </button>
        <button>
          <i class="fa-solid fa-circle-plus text-2xl"></i>
        </button>
      </div>
    </nav>
  </header>
  <ModalWrapper @close-modal="toggleModal" :show-modal="showModal">
    <ModalInfo />
  </ModalWrapper>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import ModalWrapper from "./ModalWrapper.vue";
import ModalInfo from "./ModalInfo.vue";
const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>
