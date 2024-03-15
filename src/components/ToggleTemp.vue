<template>
  <label class="inline-flex cursor-pointer select-none items-center">
    <input type="checkbox" class="sr-only" @change="toggleStore.toggleTemp()" />
    <div
      class="flex h-7 w-20 items-center rounded-md bg-white p-0.5 text-black"
    >
      <div class="relative flex h-full w-full items-center justify-center">
        <div
          :class="`absolute left-0 top-0 z-30 h-full w-1/2 rounded-[4px] bg-[rgba(0,71,171,0.99)]  transition-all ${toggleStore.isCelsius ? 'translate-x-full' : ''}`"
        >
          &nbsp;
        </div>
        <div
          :class="`relative z-50 flex flex-1 items-center justify-center text-sm font-bold transition-all ${toggleStore.isCelsius ? 'text-gray-700' : 'text-white'}`"
        >
          ℉
        </div>
        <div
          :class="`relative z-50 flex flex-1 items-center justify-center text-sm font-bold transition-all ${toggleStore.isCelsius ? 'text-white' : 'text-gray-700'}`"
        >
          ℃
        </div>
      </div>
    </div>
  </label>
</template>
<script setup>
import { onMounted } from "vue";
import { toggleStore } from "../store/toggle-store";

onMounted(async () => {
  if (localStorage.getItem("isCelsius")) {
    toggleStore.loadToggleTemp(JSON.parse(localStorage.getItem("isCelsius")));
  }
});
</script>
