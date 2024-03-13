<template></template>
<script setup>
import { ref } from "vue";

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem("saved-cities")) {
    savedCities.value = JSON.parse(localStorage.getItem("saved-cities"));

    try {
      const requests = savedCities.value.map((city) => {
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=6f0bb03ad21eda5e7fe7770d6bf2d28d&units=metric`,
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

      const citiesWeather = await Promise.all(dataPromises);

      if (savedCities.value.length === citiesWeather.length) {
        citiesWeather.forEach((cityWeather, index) => {
          savedCities.value[index].weather = citiesWeather;
        });

        console.log(savedCities.value);
      } else {
        throw new Error("Something Went Wrong");
      }

      // TODO
    } catch (error) {
      console.log(error);
    }
  }
};

await getCities();
</script>
