<template>
  <li>
    <RouterLink
      :to="{
        name: 'weather',
        params: { city: weather.city, region: weather.region },
        query: { lat: weather.coords.lat, lon: weather.coords.lon },
      }"
      class="flex items-center justify-between rounded-md p-3 shadow-md"
    >
      <div>
        <h2 class="text-3xl font-medium">{{ weather.city }}</h2>
        <h3 class="mt-2">{{ weather.region }}</h3>
      </div>

      <div>
        <p class="text-end text-3xl font-medium">
          {{ Math.round(weather.weatherData.main.temp) }}&deg;
        </p>
        <div class="mt-2 flex gap-2 font-medium">
          <span class="text-xs">
            H:
            {{ Math.round(weather.weatherData.main.temp_max) }}&deg;
          </span>
          <span class="text-xs">
            L:
            {{ Math.round(weather.weatherData.main.temp_min) }}&deg;
          </span>
        </div>
      </div>
    </RouterLink>
  </li>
</template>
<script setup>
import { RouterLink } from "vue-router";

defineProps(["weather"]);
</script>
