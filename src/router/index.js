import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";
import WeatherView from "../views/WeatherView.vue";
import Playaround from "../views/Playaround.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/weather/:city/:region",
    //   name: "city",
    //   component: CityView,
    // },
    {
      path: "/weather/:city/:region",
      name: "weather",
      component: WeatherView,
    },
    {
      path: "/test",
      name: "test",
      component: Playaround,
    },
  ],
});

export default router;
