<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="relative min-h-[105vh] bg-slate-50">
    <TheHeader />
    <div class="mx-auto max-w-screen-xl px-3 py-5">
      <RouterView />
    </div>
    <span class="absolute bottom-2 right-1/2 translate-x-1/2 text-sm text-slate-700">
      Курсовой проект по "Технологиям обработки больших данных", 2024
    </span>
  </div>
</template>
