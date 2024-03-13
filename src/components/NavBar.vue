<template>
  <header>
    <nav class="flex h-16 items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3"
        ><i class="fa-solid fa-cloud-sun text-3xl"></i>
        <p>Local Weather</p></RouterLink
      >
      <div class="flex items-center gap-3">
        <button @click="toggleModal">
          <i class="fa-solid fa-circle-info text-xl"></i>
        </button>
        <button @click="saveWeather" v-if="!hasSaved && route.path !== '/'">
          <i class="fa-regular fa-bookmark text-xl">&nbsp;</i>
        </button>
        <button
          @click="removeWeather"
          v-else-if="hasSaved && route.path !== '/'"
        >
          <i class="fa-solid fa-bookmark text-xl">&nbsp;</i>
        </button>
      </div>
    </nav>
  </header>
  <ModalWrapper @close-modal="toggleModal" :show-modal="showModal">
    <ModalInfo />
  </ModalWrapper>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import ModalWrapper from "./ModalWrapper.vue";
import ModalInfo from "./ModalInfo.vue";

const savedWeathers = ref([]);

const showModal = ref(false);

const route = useRoute();

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const saveWeather = () => {
  const weatherObj = {
    city: route.params.city,
    region: route.params.region,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedWeathers.value.push(weatherObj);
  localStorage.setItem("saved-weathers", JSON.stringify(savedWeathers.value));
};

const removeWeather = () => {
  savedWeathers.value = savedWeathers.value.filter(
    (weather) =>
      weather.coords.lat !== route.query.lat &&
      weather.coords.lon !== route.query.lon,
  );
  localStorage.setItem("saved-weathers", JSON.stringify(savedWeathers.value));
};

const hasSaved = computed(() => {
  return savedWeathers.value.some((weather) => {
    return (
      weather.coords.lat === route.query.lat &&
      weather.coords.lon === route.query.lon
    );
  });
});

onMounted(() => {
  if (localStorage.getItem("saved-weathers")) {
    savedWeathers.value = JSON.parse(localStorage.getItem("saved-weathers"));
  }
});
</script>
