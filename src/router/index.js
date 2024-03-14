import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import WeatherView from "../views/WeatherView.vue";
import Playaround from "../views/Playaround.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:city/:region",
      name: "weather",
      component: WeatherView,
      meta: { title: "Weather" },
    },
    {
      path: "/test",
      name: "test",
      component: Playaround,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.params.region ? `${to.params.city}` : to.meta.title} | Local Weather`;
  next();
});

export default router;
