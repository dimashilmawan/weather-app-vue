<template>
  <main class="pt-10">
    <p class="mb-3">Start typing to search for a City.</p>
    <VSelect
      class="style-chooser"
      :options="options"
      @search="handleSearchCity"
      v-model="selected"
    >
      <template v-slot:no-options="{ search, searching }">
        <template v-if="searching">
          No results found for <em>{{ search }}</em
          >.
        </template>
        <em v-else style="opacity: 0.5">Start typing to search for a City.</em>
      </template></VSelect
    >
    <div class="py-6">
      <WeatherList />
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import VSelect from "vue-select";
import { useRouter } from "vue-router";
import WeatherList from "@/components/WeatherList.vue";

const options = ref([]);
const selected = ref(null);
const router = useRouter();

watch(selected, async () => {
  if (selected.value) {
    const lat = selected.value.coords.lat;
    const lon = selected.value.coords.lon;
    const [city, region] = selected.value.label.split(",");
    router.push({
      name: "weather",
      params: {
        city,
        region: region.trim(),
      },
      query: { lat, lon },
    });
  }
});

const handleSearchCity = (search, loading) => {
  if (search) {
    loading(true);
    getCityAndSetOptions(search, loading);
  }
};

const getCityAndSetOptions = debounce(async (search, loading) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=500000&namePrefix=${search}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d095d3a11mshb2941a434ff6458p1fa04bjsnbc26a7b97043",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const res = await fetch(url, fetchOptions);
    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    const citiesData = result.data;

    const selectOptions = citiesData.map((data, index) => ({
      id: index,
      label: `${data.name}, ${data.region}, ${data.country}`,
      coords: { lat: data.latitude, lon: data.longitude },
    }));

    options.value = selectOptions;
  } catch (error) {
  } finally {
    loading(false);
  }
}, 350);
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: white;

  border: none;
  color: #374151;
}

.style-chooser .vs__dropdown-toggle {
  height: 2.5rem !important ;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #374151;
}
</style>
