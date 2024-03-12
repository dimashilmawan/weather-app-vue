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
        <button @click="saveCity" v-if="route.query.preview">
          <i class="fa-solid fa-circle-plus text-xl"></i>
        </button>
      </div>
    </nav>
  </header>
  <ModalWrapper @close-modal="toggleModal" :show-modal="showModal">
    <ModalInfo />
  </ModalWrapper>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { nanoid } from "nanoid";

import ModalWrapper from "./ModalWrapper.vue";
import ModalInfo from "./ModalInfo.vue";

const savedCities = ref([]);
const showModal = ref(false);

const router = useRouter();
const route = useRoute();

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const saveCity = () => {
  // if (localStorage.getItem("saved-cities")) {
  //   savedCities.value = JSON.parse(localStorage.getItem("saved-cities"));
  // }

  // const locationObj = {
  //   id: nanoid(),
  //   city: route.params.city,
  //   region: route.params.region,
  //   coords: {
  //     lat: route.query.lat,
  //     lon: route.query.lon,
  //   },
  // };

  // savedCities.value.push(locationObj);
  // localStorage.setItem("saved-cities", JSON.stringify(savedCities.value));

  const query = Object.assign({}, route.query);
  delete query.preview;

  router.replace({ query });
};
</script>
