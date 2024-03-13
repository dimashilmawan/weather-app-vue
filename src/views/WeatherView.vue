<template>
  <p v-if="isLoading">Loading</p>
  <div v-else-if="isError">{{ isError }}</div>
  <div v-else class="mt-8 flex flex-col items-center justify-center">
    <p class="text-3xl font-medium">{{ route.params.city }}</p>
    <p class="mt-2">
      {{
        new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
        })
      }}
      &nbsp;
      {{
        new Date(weatherData.dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
      }}
    </p>
    <p class="mt-6 text-7xl font-bold">
      {{ Math.round(weatherData.main.temp) }} &#8451;
    </p>
    <p class="mt-2">
      Feels like
      <span class="font-semibold"
        >{{ Math.round(weatherData.main.feels_like) }} &#8451;</span
      >
    </p>
    <img
      :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`"
      alt="weather icon"
      class="-mt-2 h-36 w-36"
    />
    <p class="-mt-7">{{ weatherData.weather[0].description }}</p>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isLoading = ref(true);
const weatherData = ref(null);
const isError = ref(null);

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=6f0bb03ad21eda5e7fe7770d6bf2d28d&units=metric`,
    );
    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    weatherData.value = result;
    console.log(result);
  } catch (error) {
    isError.value = error.message;
  } finally {
    isLoading.value = false;
  }
});
</script>
