<template>
  <main>
    <VSelect
      @search="handleSearchCity"
      :options="options"
      label="label"
      :filterable="false"
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
import { onBeforeMount, ref, watch } from "vue";
import debounce from "lodash.debounce";
import VSelect from "vue-select";

const options = ref([]);

const handleSearchCity = async (search, loading) => {
  loading(true);
  fetchCity(search, loading);
};

const fetchCity = debounce((search, loading) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${search}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d095d3a11mshb2941a434ff6458p1fa04bjsnbc26a7b97043",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  fetch(url, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const selectOptions = result.data.map((data) => ({
        label: `${data.name}, ${data.region}, ${data.country}`,
        value: { lat: data.latitude, lon: data.longitude },
      }));
      options.value = selectOptions;
      loading(false);
    })
    .catch((error) => {
      console.log(error);
      loading(false);
    });
}, 500);

watch(
  options,
  debounce(() => {
    console.log(options.value);
  }, 500),
);
</script>
