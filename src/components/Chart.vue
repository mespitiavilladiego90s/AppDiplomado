<template>
    <div class="p-4">
      <div class="flex flex-col space-y-4">
        <div class="flex space-x-4">
          <select v-model="selectedPeriodo" class="p-2 border rounded">
            <option disabled value="">Periodo</option>
            <option v-for="periodo in periodos" :key="periodo" :value="periodo">
              {{ periodo }}
            </option>
          </select>
          <select v-model="selectedField" class="p-2 border rounded">
            <option disabled value="">Select Field</option>
            <option value="total_matricula">Total Matricula</option>
            <option value="sexo_feme">Sexo Femenino</option>
            <option value="sexo_masc">Sexo Masculino</option>
          </select>
          <button @click="fetchData" class="bg-blue-500 text-white p-2 rounded">Buscar</button>
        </div>
        <div>
          <canvas id="enrollmentChart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  interface DataItem {
    id: number;
    periodo: string;
    facultad: string;
    programa: string;
    total_matricula: number;
    sexo_feme: number;
    sexo_masc: number;
    estrato_1: number;
    estrato_2: number;
    estrato_3: number;
    estrato_4: number;
    estrato_5: number;
    estrato_6: number;
  }
  
  export default defineComponent({
    setup() {
      const selectedPeriodo = ref('');
      const selectedField = ref('');
      const periodos = ref<string[]>([]);
      const chartInstance = ref<Chart<"bar", any, unknown> | null>(null);
  
      onMounted(async () => {
        const response = await axios.get<DataItem[]>('https://www.datos.gov.co/resource/r86y-229a.json');
        periodos.value = [...new Set(response.data.map(item => item.periodo))];
      });
  
      const fetchData = async () => {
        if (!selectedPeriodo.value || !selectedField.value) return;
  
        const response = await axios.get<DataItem[]>('https://www.datos.gov.co/resource/r86y-229a.json', {
          params: {
            periodo: selectedPeriodo.value
          }
        });
  
        const data = response.data.map(item => ({
          programa: item.programa,
          value: parseFloat(item[selectedField.value as keyof DataItem] as string) // Parse value to number
        }));
  
        updateChart(data);
      };
  
      const updateChart = (data: { programa: string; value: number }[]) => {
        if (chartInstance.value) {
          chartInstance.value.destroy();
        }
  
        const ctx = (document.getElementById('enrollmentChart') as HTMLCanvasElement)?.getContext('2d');
        if (!ctx) return;
  
        chartInstance.value = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.programa),
            datasets: [{
              label: selectedField.value,
              data: data.map(item => item.value),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      };
  
      return {
        selectedPeriodo,
        selectedField,
        periodos,
        fetchData
      };
    },
  });
  </script>