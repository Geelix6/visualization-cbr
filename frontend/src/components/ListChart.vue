<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps<{
  data: { date: string; value: number }[];
  nominal?: number;
  currencyCode?: string;
  isForKeyRate?: boolean;
}>();
const labels = computed(() => props.data.map((el) => el.date));
const data = computed(() => props.data.map((el) => el.value));

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: props.isForKeyRate ? "" : `Цена за ${props.nominal} ${props.currencyCode}`,
      data: data.value,
      borderColor: "#42A5F5",
      backgroundColor: "rgba(66, 165, 245, 0.2)",
      borderWidth: data.value.length < 200 || props.isForKeyRate ? 2 : 1,
      pointRadius: data.value.length < 200 ? 1.5 : 0,
      pointHoverRadius: 4,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: !props.isForKeyRate,
    },
  },
  scales: {
    y: {
      ticks: {
        callback(value: string | number) {
          return props.isForKeyRate ? value + "%" : value + " ₽";
        },
      },
    },
  },
};
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
