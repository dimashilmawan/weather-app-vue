<template>
  <WeatherViewSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="mt-24 rounded-md bg-red-950/60 p-10">
    <p class="text-center text-xl font-medium">
      {{ isError }}
    </p>
  </div>
  <div v-else class="flex flex-col items-center justify-center pt-24">
    <p class="whitespace-nowrap text-3xl font-medium">
      {{ route.params.city }}
    </p>
    <p class="mt-2">
      {{
        new Date(weatherData.localTime).toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
        })
      }}
      &nbsp;
      {{
        new Date(weatherData.localTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
      }}
    </p>
    <p class="mt-6 text-7xl font-bold">
      {{ temperatureConverter(weatherData.main.temp, toggleStore.isCelsius) }}
    </p>
    <p class="mt-2">
      Feels like
      <span class="font-semibold">{{
        temperatureConverter(weatherData.main.feels_like, toggleStore.isCelsius)
      }}</span>
    </p>
    <div
      class="flex items-center justify-center rounded-lg mix-blend-difference"
    >
      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`"
        alt="weather icon"
        class="-mt-2 h-36 w-36"
      />
    </div>
    <p class="-mt-7">{{ weatherData.weather[0].description }}</p>
  </div>
</template>
<script setup>
import WeatherViewSkeleton from "@/components/WeatherViewSkeleton.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toggleStore } from "../store/toggle-store";

const route = useRoute();

const isLoading = ref(true);
const weatherData = ref(null);
const isError = ref(null);

const calculateLocalTime = (dt, timezone) => {
  const timestampMs = dt * 1000;

  const date = new Date(timestampMs);

  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  const localTime = new Date(utcTime + timezone * 1000);

  return localTime;
};

const temperatureConverter = (value, isCelsius) => {
  if (isCelsius) {
    return `${Math.round(value)} ℃`;
  } else {
    return `${Math.round((value * 9) / 5 + 32)} ℉`;
  }
};

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`,
    );
    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    await new Promise((resolve) => setTimeout(resolve, 400));

    weatherData.value = result;

    const localTime = calculateLocalTime(
      weatherData.value.dt,
      weatherData.value.timezone,
    );

    weatherData.value.localTime = localTime;
  } catch (error) {
    isError.value = error.message;
  } finally {
    isLoading.value = false;
  }
});
</script>
