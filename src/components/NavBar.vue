<template>
  <header>
    <nav class="flex h-16 items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3"
        ><i class="fa-solid fa-cloud-sun text-3xl"></i>
        <p>Local Weather</p></RouterLink
      >
      <div class="flex items-center gap-3">
        <button>
          <i class="fa-solid fa-circle-info text-2xl"></i>
        </button>
        <button>
          <i class="fa-solid fa-circle-plus text-2xl"></i>
        </button>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
