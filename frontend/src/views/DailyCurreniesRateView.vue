<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { Card, Skeleton } from "primevue";
import { currencies } from "../currencies";

const currenciesRef = ref(currencies);
const currenciesDaily = ref();
const { data } = useFetch("api/v1/daily").json();

watch(data, () => {
  currenciesDaily.value = data.value.ValCurs.Valute.map((el: any) => ({
    code: el.CharCode[0],
    nominal: +el.Nominal[0],
    value: +el.Value[0].replace(",", "."),
  }));
});
</script>

<template>
  <h1 class="mb-4 text-3xl">Курсы валют на {{ new Date().toLocaleDateString() }}</h1>
  <div class="mb-16 grid grid-cols-3 gap-4">
    <Card v-for="currency of currenciesRef" :key="currency.name" :pt="{ body: { class: 1 } }">
      <template #content>
        <i
          class="fi mx-auto !block aspect-[4/3] !w-10"
          :class="[
            `fi-${currency.flag}`,
            currency.flag == 'jp' || currency.flag == 'kr' || currency.flag == 'pl' ? 'border-2' : '',
          ]"
        ></i>
        <p class="text-center text-xl">{{ currency.name }}</p>
        <p class="-mt-1 mb-2 text-center text-sm text-gray-500">{{ currency.codeISO }}</p>

        <Skeleton v-if="!currenciesDaily" class="mx-auto !h-6 !w-1/2" />
        <p v-else class="text-center font-semibold">
          {{ currenciesDaily.find((el: any) => el.code == currency.codeISO).nominal }}
          {{ currency.codeISO }} = {{ currenciesDaily.find((el: any) => el.code == currency.codeISO).value }} ₽
        </p>
      </template>
    </Card>
  </div>
</template>
