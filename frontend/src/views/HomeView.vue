<script setup lang="ts">
import Tree from "primevue/tree";

const treeNodes = [
  {
    key: "0",
    label: "Какие валюты доступны?",
    children: [
      { key: "0-1", label: "USD - Доллар США", icon: "fi fi-us" },
      { key: "0-2", label: "EUR - Евро", icon: "fi fi-eu" },
      { key: "0-3", label: "GBP - Фунт стерлингов", icon: "fi fi-gb" },
      { key: "0-4", label: "JPY - Японская иена", icon: "fi fi-jp" },
      { key: "0-5", label: "CNY - Китайский юань", icon: "fi fi-cn" },
      { key: "0-6", label: "AUD - Австарлийский доллар", icon: "fi fi-au" },
      { key: "0-7", label: "CAD - Канадский доллар", icon: "fi fi-ca" },
      { key: "0-8", label: "CHF - Швейцарский франк", icon: "fi fi-ch" },
      { key: "0-9", label: "HKD - Гонконгский доллар", icon: "fi fi-hk" },
      { key: "0-10", label: "SGD - Сингапуский доллар", icon: "fi fi-sg" },
      { key: "0-11", label: "SEK - Шведская крона", icon: "fi fi-se" },
      { key: "0-12", label: "KRW - Южнокорейский вон", icon: "fi fi-kr" },
      { key: "0-13", label: "NOK - Норвежская крона", icon: "fi fi-no" },
      { key: "0-14", label: "NZD - Новозеландский доллар", icon: "fi fi-nz" },
      { key: "0-15", label: "INR - Индийская рупия", icon: "fi fi-in" },
      { key: "0-16", label: "ZAR - Южноафриканский ранд", icon: "fi fi-za" },
      { key: "0-17", label: "BRL - Бразильский реал", icon: "fi fi-br" },
      { key: "0-18", label: "DKK - Датская крона", icon: "fi fi-dk" },
      { key: "0-19", label: "PLN - Польский злотый", icon: "fi fi-pl" },
      { key: "0-20", label: "THB - Таиладндский бат", icon: "fi fi-th" },
    ],
  },
];
</script>

<template>
  <h1 class="mb-6 inline-block border-b-2 pb-2 text-3xl">
    Визуализация ежедневных данных с помощью web-сервиса Центробанка РФ
  </h1>
  <div class="max-w-screen-md text-justify">
    <p class="mb-2">
      На этом сайте пользователь может получить информацию о курсах двадцати валют и о ключевой ставке в России.
      Получение данных происходит с помощью API предоставляемым Центробанком Российской Федерации (ЦБ РФ)
    </p>
    <Tree
      :value="treeNodes"
      :pt="{
        root: { class: '!bg-transparent !p-0' },
        nodeLabel: { class: '!text-black' },
      }"
      class="-ml-4 mb-6"
    />

    <h2 class="mb-2 text-2xl">Разделы сайта</h2>
    <ul class="mb-2 flex list-disc flex-col gap-y-2 pl-5">
      <li>
        <span class="font-semibold">"Курсы валют"</span> - на этой вкладке можно получить информацию о курсах двадцати
        валют на сегодняшний день ({{ new Date().toLocaleDateString() }})
      </li>
      <li>
        <span class="font-semibold">"График курса валюты"</span> - на этой вкладке можно выбрать курс интересующей
        валюты и любой период времени (но не ранее 01.07.1992 и до сегодняшнего дня) и после этого получить график курса
        для этой валюты
      </li>
      <li>
        <span class="font-semibold">"График ключевой ставки"</span> - на этой вкладке можно увидеть график ключевой
        ставки в России начиная с 17.09.2013
      </li>
    </ul>
    <p>Для того чтобы перемещаться по разделам, необходимо нажимать на ссылки в "шапке" сайта</p>
  </div>
</template>
