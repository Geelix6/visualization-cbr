<script setup lang="ts">
import { computed, ref } from "vue";
import { useFetch } from "@vueuse/core";
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";
import Button from "primevue/button";
import ListChart from "../components/ListChart.vue";
import { currencies } from "../currencies";

const currenciesRef = ref(currencies);
const selectedCurrency = ref();
const dayStart = ref();
const dayEnd = ref();
const minDate = ref(new Date("07.01.1992"));
const maxDate = ref(new Date());
const currencyData = ref();
const currencyCode = ref();
const nominal = ref();

const isDisabled = computed(() => {
  return !(dayStart.value && dayEnd.value && selectedCurrency.value);
});

const getCurrencyData = async () => {
  const { data } = await useFetch("api/v1/currency")
    .post({
      start: dayStart.value,
      end: dayEnd.value,
      code: selectedCurrency.value?.codeCBR,
    })
    .json();

  currencyData.value = data.value.ValCurs.Record.map((el: any) => ({
    date: el.$.Date,
    value: +el.Value[0].replace(",", "."),
  }));

  currencyCode.value = currencies.find((cur) => cur.codeCBR == data.value.ValCurs.$.ID)?.codeISO;
  nominal.value = +data.value.ValCurs.Record[0].Nominal[0];
};
</script>

<template>
  <section class="flex gap-x-8">
    <div class="shrink-0">
      <div class="mb-6 flex max-w-md flex-col gap-y-2">
        <h1 class="text-3xl">График курса валюты за период</h1>
        <p class="text-sm text-gray-500">
          Выберите валюту и даты для отображения графика по этим данным. Для получения нового графика нужно изменить
          значения в полях и нажать на "Обновить данные"
        </p>
      </div>

      <div class="flex w-80 flex-col gap-y-2">
        <Select
          v-model="selectedCurrency"
          :options="currenciesRef"
          :focusOnHover="false"
          pt:overlay:class="!bg-slate-100"
          pt:option:class="hover:bg-sky-100"
          placeholder="Выберите валюту"
        >
          <template #value="slotProps">
            <template v-if="slotProps.value">
              <span class="fi mr-2 rounded-sm" :class="`fi-${slotProps.value.flag}`"></span>
              <span class="mr-2">{{ slotProps.value.codeISO }}</span>
            </template>
            <template v-else>
              <span>{{ slotProps.placeholder }}</span>
            </template>
          </template>
          <template #option="slotProps">
            <span class="fi mr-2 rounded-sm" :class="`fi-${slotProps.option.flag}`"></span>
            <span class="mr-2">{{ slotProps.option.codeISO }}</span>
            <span class="text-sm text-gray-400">{{ slotProps.option.name }}</span>
          </template>
        </Select>
        <DatePicker v-model="dayStart" :minDate="minDate" :maxDate="maxDate" placeholder="С" showIcon>
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>
        <DatePicker v-model="dayEnd" :minDate="minDate" :maxDate="maxDate" placeholder="До" showIcon>
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>
        <Button
          @click="getCurrencyData"
          :disabled="isDisabled"
          class="mt-2 !w-60 !bg-slate-700 disabled:!cursor-not-allowed"
        >
          {{ !currencyData ? "Получить данные" : "Обновить данные" }}
        </Button>
      </div>
    </div>
    <div class="w-full">
      <ListChart v-if="currencyData" :data="currencyData" :currencyCode="currencyCode" :nominal="nominal" />
      <h2 v-else class="mt-10 text-center text-sm text-gray-500">График появится здесь</h2>
    </div>
  </section>
</template>
