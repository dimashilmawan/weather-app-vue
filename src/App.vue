<script setup>
import { RouterLink, RouterView } from "vue-router";
import Container from "./components/Container.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-[#0047AB] to-[#002640] font-roboto text-white"
  >
    <Container class="!max-w-xl">
      <NavBar />
      <RouterView />
    </Container>
  </div>
</template>
