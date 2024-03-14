<template>
  <li>
    <RouterLink
      :to="{
        name: 'weather',
        params: { city: weather.city, region: weather.region },
        query: { lat: weather.coords.lat, lon: weather.coords.lon },
      }"
      class="flex h-24 items-center justify-between rounded-md bg-white/85 px-5 text-gray-700"
    >
      <div>
        <h2 class="text-3xl font-medium">{{ weather.city }}</h2>
        <h3 class="mt-2">{{ weather.region }}</h3>
      </div>

      <div>
        <p class="text-end text-3xl font-medium">
          {{ temperatureConverter(weather.weatherData.main.temp, isCelsius) }}
        </p>
        <div class="mt-2 flex gap-2 font-medium">
          <span class="text-xs">
            H:
            {{
              temperatureConverter(weather.weatherData.main.temp_max, isCelsius)
            }}
          </span>
          <span class="text-xs">
            L:
            {{
              temperatureConverter(weather.weatherData.main.temp_min, isCelsius)
            }}
          </span>
        </div>
      </div>
    </RouterLink>
  </li>
</template>
<script setup>
import { inject } from "vue";
import { RouterLink } from "vue-router";

defineProps(["weather"]);

const { isCelsius } = inject("isCelsius");

const temperatureConverter = (value, isCelsius) => {
  if (isCelsius) {
    return `${Math.round(value)} ℃`;
  } else {
    return `${Math.round((value * 9) / 5 + 32)} ℉`;
  }
};
</script>
