<template>
  <header>
    <nav class="flex h-16 items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3">
        <FontAwesomeIcon :icon="faCloudSunRain" size="2xl" />
        <p class="font-medium">Local Weather</p>
      </RouterLink>
      <div class="flex items-center gap-3">
        <ToggleTemp />
        <button @click="toggleModalInfo">
          <FontAwesomeIcon :icon="faCircleInfo" size="lg" />
        </button>
        <button @click="saveWeather" v-if="!hasSaved && route.path !== '/'">
          <FontAwesomeIcon :icon="faBookmarkRegular" size="lg" />
        </button>
        <button
          @click="removeWeather"
          v-else-if="hasSaved && route.path !== '/'"
        >
          <FontAwesomeIcon :icon="faBookmarkSolid" size="lg" />
        </button>
      </div>
    </nav>
  </header>
  <ModalWrapper @close-modal="toggleModalInfo" :show-modal="showModalInfo">
    <ModalInfo />
  </ModalWrapper>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import ModalWrapper from "./ModalWrapper.vue";
import ModalInfo from "./ModalInfo.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBookmark as faBookmarkSolid,
  faCircleInfo,
  faCloudSunRain,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import ToggleTemp from "./ToggleTemp.vue";

const savedWeathers = ref([]);

const showModalInfo = ref(false);

const route = useRoute();

const toast = useToast();

const toggleModalInfo = () => {
  showModalInfo.value = !showModalInfo.value;
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

  toast.success("Weather saved successfully!", { timeout: 2000 });
};

const removeWeather = () => {
  savedWeathers.value = savedWeathers.value.filter(
    (weather) =>
      weather.coords.lat !== route.query.lat &&
      weather.coords.lon !== route.query.lon,
  );
  localStorage.setItem("saved-weathers", JSON.stringify(savedWeathers.value));

  toast.success("Weather removed successfully!", { timeout: 2000 });
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
