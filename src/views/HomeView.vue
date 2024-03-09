<template>
  <main>
    <VSelect
      :options="options"
      @search="handleSearchCity"
      v-model="selected"
      :reduce="(city) => city.value"
    >
      <template v-slot:no-options="{ search, searching }">
        <template v-if="searching">
          No results found for <em>{{ search }}</em
          >.
        </template>
        <em v-else style="opacity: 0.5"
          >Start typing to search for a country.</em
        >
      </template></VSelect
    >
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import VSelect from "vue-select";

const options = ref([]);
const selected = ref(null);

watch(selected, async () => {
  if (selected.value) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selected.value.lat}&lon=${selected.value.lon}&appid=6f0bb03ad21eda5e7fe7770d6bf2d28d`,
      );
      const result = await res.json();

      console.log(result);
    } catch (error) {}
  }
});

const handleSearchCity = (search, loading) => {
  if (search) {
    loading(true);
    fetchCity(search, loading);
  }
};

const fetchCity = debounce(async (search, loading) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${search}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d095d3a11mshb2941a434ff6458p1fa04bjsnbc26a7b97043",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const res = await fetch(url, fetchOptions);
    if (!res.ok) throw new Error("Something went wrong");
    const result = await res.json();

    const selectOptions = result.data.map((data) => ({
      label: `${data.name}, ${data.region}, ${data.country}`,
      value: { lat: data.latitude, lon: data.longitude },
    }));

    options.value = selectOptions;
    console.log("after push options");
  } catch (error) {
  } finally {
    loading(false);
  }
}, 500);
</script>
