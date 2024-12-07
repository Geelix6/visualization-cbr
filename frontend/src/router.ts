import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import DailyCurreniesRateView from "./views/DailyCurreniesRateView.vue";
import RangeCurrencyRateView from "./views/RangeCurrencyRateView.vue";
import KeyRateView from "./views/KeyRateView.vue";

export const router = createRouter({
  routes: [
    { path: "/", component: HomeView },
    { path: "/daily", component: DailyCurreniesRateView },
    { path: "/currencies", component: RangeCurrencyRateView },
    { path: "/key-rate", component: KeyRateView },
  ],
  history: createWebHistory(),

  linkExactActiveClass: "!border-b-slate-600 hover:!opacity-100",
});
