<template>
  <p v-if="isLoading"><WeatherCardSkeleton /></p>
  <div v-else-if="isError">{{ isError }}</div>
  <div v-else-if="savedWeathers.length === 0">Empty</div>
  <ul v-else class="mt-6 space-y-4">
    <WeatherCard
      v-for="weather in savedWeathers"
      :weather="weather"
      :key="weather.coords.lat + weather.coords.lon"
    />
  </ul>
</template>
<script setup>
import { onMounted, ref } from "vue";
import WeatherCard from "./WeatherCard.vue";
import WeatherCardSkeleton from "./WeatherCardSkeleton.vue";

const isLoading = ref(true);
const savedWeathers = ref([]);
const isError = ref(null);

onMounted(async () => {
  if (localStorage.getItem("saved-weathers")) {
    savedWeathers.value = JSON.parse(localStorage.getItem("saved-weathers"));

    try {
      const requests = savedWeathers.value.map((weather) => {
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${weather.coords.lat}&lon=${weather.coords.lon}&appid=6f0bb03ad21eda5e7fe7770d6bf2d28d&units=metric`,
        );
      });

      const responses = await Promise.all(requests);

      const dataPromises = responses.map(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        return result;
      });

      const weathers = await Promise.all(dataPromises);

      await new Promise((resolve) => setTimeout(resolve, 500));

      weathers.forEach((weather, index) => {
        savedWeathers.value[index].weatherData = weather;
      });
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    console.log(savedWeathers.value);
    isLoading.value = false;
  }
});
</script>
