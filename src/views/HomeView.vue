<template>
  <main>
    <VSelect :options="options" @search="handleSearchCity" v-model="selected">
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
import { useRouter } from "vue-router";

const options = ref([]);
const selected = ref(null);
const router = useRouter();

watch(selected, async () => {
  if (selected.value) {
    const lat = selected.value.value.lat;
    const lon = selected.value.value.lon;
    const [city, region] = selected.value.label.split(",");
    router.push({
      name: "city",
      params: {
        city,
        region: region.replaceAll(" ", ""),
      },
      query: { lat, lon, preview: true },
    });
  }
});

const handleSearchCity = (search, loading) => {
  if (search) {
    loading(true);
    console.log("search");
    getCityAndSetOptions(search, loading);
  }
};

const getCityAndSetOptions = debounce(async (search, loading) => {
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
    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    const citiesData = result.data;

    const selectOptions = citiesData.map((data, index) => ({
      id: index,
      label: `${data.name}, ${data.region}, ${data.country}`,
      value: { lat: data.latitude, lon: data.longitude },
    }));

    options.value = selectOptions;
  } catch (error) {
  } finally {
    loading(false);
  }
}, 500);
</script>
