<script setup>
import { RouterView } from "vue-router";
import Container from "./components/Container.vue";
import NavBar from "./components/NavBar.vue";
import { Transition } from "vue";
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
