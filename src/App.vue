<script setup>
import { RouterView } from "vue-router";
import Container from "./components/Container.vue";
import NavBar from "./components/NavBar.vue";
import { Transition, provide, ref } from "vue";

const isCelsius = ref(true);

const toggleTemp = () => {
  isCelsius.value = !isCelsius.value;
  localStorage.setItem("isCelsius", JSON.stringify(isCelsius.value));
};

const loadToggleTemp = (value) => {
  isCelsius.value = value;
};

provide("isCelsius", {
  isCelsius,
  toggleTemp,
  loadToggleTemp,
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-[#0047AB] to-[#002640] font-roboto text-white"
  >
    <Container class="!max-w-xl">
      <NavBar />
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in" appear>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Container>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
