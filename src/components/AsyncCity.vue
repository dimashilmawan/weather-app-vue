<template>
  <div class="pb-8 pt-4">
    <div
      v-if="route.query.preview"
      class="w-full rounded-md bg-emerald-600 p-4 text-center text-white"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <div class="mt-8 flex flex-col items-center justify-center">
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
      <p class="mt-6 text-7xl font-bold">
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
    <hr class="my-8 border text-gray-700" />
    <div>
      <h2 class="text-lg font-medium capitalize">hourly weather</h2>
      <ul class="flex gap-4 overflow-x-auto py-4 text-center text-sm">
        <li
          v-for="hourlyData in weatherData.hourly"
          :key="hourlyData.dt"
          class="space-y-1.5"
        >
          <p class="whitespace-nowrap">
            {{
              new Date(hourlyData.currentTime).toLocaleTimeString("en-US", {
                hour: "numeric",
              })
            }}
          </p>
          <img
            :src="`https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`"
            alt="weather icon"
            class="h-14 w-auto object-cover"
          />
          <p class="whitespace-nowrap">
            {{ Math.round(hourlyData.temp) }} &#8451;
          </p>
        </li>
      </ul>
    </div>
    <hr class="my-8 border text-gray-700" />
    <div>
      <h2 class="text-lg font-medium capitalize">7 days forecast</h2>
      <ul class="flex flex-col gap-4 text-sm">
        <li
          v-for="dailyData in weatherData.daily"
          :key="dailyData.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(dailyData.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              })
            }}
          </p>
          <img
            :src="`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`"
            alt="weather icon"
            class="h-14 w-auto object-cover"
          />
          <div class="flex flex-1 justify-end gap-3">
            <p>H: {{ Math.round(dailyData.temp.max) }}</p>
            <p>L: {{ Math.round(dailyData.temp.min) }}</p>
          </div>
        </li>
      </ul>
    </div>
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
