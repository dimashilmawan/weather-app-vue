<template>
  <Suspense>
    <template #fallback>
      <p>loading...</p>
    </template>
    <AsyncCity />
  </Suspense>
</template>

<script setup>
import AsyncCity from "@/components/AsyncCity.vue";
</script>
