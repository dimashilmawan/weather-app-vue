<template>
  <ul class="mt-6 space-y-4">
    <Skeleton
      v-for="n in 3"
      class="flex h-24 items-center rounded-md bg-white/85 px-5"
    >
      <div class="w-full">
        <Skeleton class="h-7 w-3/4 !bg-gray-700" />
        <Skeleton class="mt-4 h-4 w-1/5 !bg-gray-700" />
      </div>
      <div class="w-1/5">
        <Skeleton class="ml-auto h-7 w-2/3 justify-end !bg-gray-700" />
        <Skeleton class="mt-4 h-4 w-full !bg-gray-700" />
      </div>
    </Skeleton>
  </ul>
</template>
<script setup>
import Skeleton from "./Skeleton.vue";
</script>
