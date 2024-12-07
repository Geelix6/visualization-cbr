<script setup lang="ts">
import { RouterLink } from "vue-router";
import HomePageIcon from "../icons/HomePageIcon.vue";
</script>

<template>
  <header class="flex h-16 items-center bg-white shadow">
    <nav class="mx-auto flex w-full max-w-screen-xl justify-between p-3">
      <div class="flex gap-x-4">
        <RouterLink to="daily" class="border-b-2 border-transparent transition-opacity hover:opacity-70">
          Курсы валют
        </RouterLink>
        <RouterLink to="currencies" class="border-b-2 border-transparent transition-opacity hover:opacity-70">
          График курса валюты
        </RouterLink>
        <RouterLink to="key-rate" class="border-b-2 border-transparent transition-opacity hover:opacity-70">
          График ключевой ставки
        </RouterLink>
      </div>

      <RouterLink to="/" class="!border-none hover:opacity-70">
        <HomePageIcon class="size-6"></HomePageIcon>
      </RouterLink>
    </nav>
  </header>
</template>
