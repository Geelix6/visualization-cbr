<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { Skeleton } from "primevue";
import ListChart from "../components/ListChart.vue";

const currencyData = ref();
const { data } = useFetch("api/v1/rate").json();

watch(data, () => {
  currencyData.value = data.value
    .map((el: any) => ({
      date: new Date(el.DT[0]).toLocaleDateString(),
      value: el.Rate[0].replace(",", "."),
    }))
    .reverse();
});
</script>

<template>
  <h1 class="mb-2 text-3xl">График ключевой ставки ЦБ РФ</h1>
  <p class="mb-4 text-sm text-gray-500">Данные по ставке доступны с 2013.09.17 и по сегодняшний день</p>
  <Skeleton class="!h-96 !w-4/5" v-if="!currencyData" />
  <div v-else class="w-4/5">
    <ListChart :data="currencyData" isForKeyRate />
  </div>
</template>
