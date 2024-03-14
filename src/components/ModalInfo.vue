<template>
  <div class="">
    <h1 class="text-lg font-medium text-gray-800">About:</h1>
    <p class="mt-1">
      The Local Weather allows you to track the current and future weather of
      cities of your choosing.
    </p>

    <h2 class="mt-4 text-lg font-medium text-gray-800">How it works:</h2>
    <ol class="mt-1 list-inside list-decimal space-y-1">
      <li>Search for your city by entering the name into the search bar.</li>
      <li>
        Select a city within the results, this will take you to the current
        weather for your selection.
      </li>
      <li>
        Track the city by clicking on the
        <span> <FontAwesomeIcon :icon="faBookmarkRegular" size="sm" /></span>
        icon in the top right. This will save the city to view at a later time
        on the home page.
      </li>
    </ol>

    <h2 class="mt-4 text-lg font-medium text-gray-800">Removing a city</h2>
    <p class="mt-1">
      If you no longer wish to track a city, simply select the city within the
      home page. At the navbar, click the
      <span> <FontAwesomeIcon :icon="faBookmarkSolid" size="sm" /></span>
      icon in the top right
    </p>
  </div>
</template>
<script setup>
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
