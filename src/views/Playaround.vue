<template>
  <div class="h-screen bg-emerald-600"></div>
</template>
<script setup>
import Skeleton from "@/components/Skeleton.vue";
import { computed, onMounted, ref } from "vue";

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=-6.18333&lon=106.83333&appid=6f0bb03ad21eda5e7fe7770d6bf2d28d&units=metric`,
    );
    const result = await res.json();

    if (!res.ok) throw new Error(result.message);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
});
</script>
