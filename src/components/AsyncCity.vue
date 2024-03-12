<template>
  <div class="py-10">
    <div class="flex flex-col items-center justify-center">
      <p class="text-3xl font-medium">{{ route.params.city }}</p>
      <p class="mt-2">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "long",
          })
        }}
        &nbsp;
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </p>
      <p class="mt-6 text-7xl font-semibold">
        {{ Math.round(weatherData.current.temp) }} &#8451;
      </p>
      <p class="mt-2">
        Feels like
        <span class="font-semibold"
          >{{ Math.round(weatherData.current.feels_like) }} &#8451;</span
        >
      </p>
      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`"
        alt="weather icon"
        class="-mt-2 h-36 w-36"
      />
      <p class="-mt-7">{{ weatherData.current.weather[0].description }}</p>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&appid=6f0bb03ad21eda5e7fe7770d6bf2d28d&units=metric`,
    );
    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    const weatherData = result;
    console.log(result);

    // calculate current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.current.dt * 1000 + localOffset;
    weatherData.currentTime = utc + 1000 * weatherData.timezone_offset;

    // cal hourly weather offset
    weatherData.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.timezone_offset;
    });

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
</script>
