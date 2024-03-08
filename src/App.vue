<script setup>
import { RouterLink, RouterView } from "vue-router";
import Container from "./components/Container.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="bg-yellow-200">
    <Container class="!max-w-xl">
      <NavBar />
      <RouterView />
    </Container>
  </div>
</template>

<style scoped></style>
