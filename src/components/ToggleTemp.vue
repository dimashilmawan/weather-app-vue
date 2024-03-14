<template>
  <label class="inline-flex cursor-pointer select-none items-center">
    <input type="checkbox" class="sr-only" @change="toggleTemperature" />
    <div class="h-6 w-20 rounded-md bg-white p-0.5 text-black">
      <div class="relative flex h-full items-center justify-center">
        <div
          :class="`absolute left-0 top-0 z-30 h-full w-1/2 rounded-[4px] bg-[rgba(0,71,171,0.99)]  transition-all ${isCelsius ? 'translate-x-full' : ''}`"
        >
          &nbsp;
        </div>
        <div
          :class="`relative z-50 flex flex-1 items-center justify-center text-sm font-bold`"
        >
          ℉
        </div>
        <div
          class="relative z-50 flex flex-1 items-center justify-center text-sm font-bold"
        >
          ℃
        </div>
      </div>
    </div>
  </label>
</template>
<script setup>
import { inject, ref } from "vue";

const { isCelsius, toggleTemperature } = inject("isCelsius");
</script>
