<template>
  <div class="flex gap-4 mb-4">
    <select
      v-model="selectedPeriodo"
      @change="fetchData"
      class="p-2 rounded border"
    >
      <option value="">Periodo</option>
      <option v-for="periodo in periodos" :key="periodo" :value="periodo">
        {{ periodo }}
      </option>
    </select>
    <select
      v-model="selectedFacultad"
      @change="fetchData"
      class="p-2 rounded border"
    >
      <option value="">Facultad</option>
      <option v-for="facultad in facultades" :key="facultad" :value="facultad">
        {{ facultad }}
      </option>
    </select>
    <select
      v-model="selectedPrograma"
      @change="fetchData"
      class="p-2 rounded border"
    >
      <option value="">Programa</option>
      <option v-for="programa in programas" :key="programa" :value="programa">
        {{ programa }}
      </option>
    </select>
  </div>

  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-blue-500 text-white">
        <th class="p-2">Periodo</th>
        <th class="p-2">Facultad</th>
        <th class="p-2">Programa</th>
        <th class="p-2">Total Matrícula</th>
        <th class="p-2">Sexo Femenino</th>
        <th class="p-2">Sexo Masculino</th>
        <th class="p-2">Estrato 1</th>
        <th class="p-2">Estrato 2</th>
        <th class="p-2">Estrato 3</th>
        <th class="p-2">Estrato 4</th>
        <th class="p-2">Estrato 5</th>
        <th class="p-2">Estrato 6</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td class="p-2">{{ item.periodo }}</td>
        <td class="p-2">{{ item.facultad }}</td>
        <td class="p-2">{{ item.programa }}</td>
        <td class="p-2">{{ item.total_matricula }}</td>
        <td class="p-2">{{ item.sexo_feme }}</td>
        <td class="p-2">{{ item.sexo_masc }}</td>
        <td class="p-2">{{ item.estrato_1 }}</td>
        <td class="p-2">{{ item.estrato_2 }}</td>
        <td class="p-2">{{ item.estrato_3 }}</td>
        <td class="p-2">{{ item.estrato_4 }}</td>
        <td class="p-2">{{ item.estrato_5 }}</td>
        <td class="p-2">{{ item.estrato_6 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

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
    const data = ref<DataItem[]>([]);
    const periodos = ref<string[]>([]);
    const facultades = ref<string[]>([]);
    const programas = ref<string[]>([]);
    const selectedPeriodo = ref<string>("");
    const selectedFacultad = ref<string>("");
    const selectedPrograma = ref<string>("");

    const fetchData = async () => {
      let url = "https://www.datos.gov.co/resource/r86y-229a.json";

      // Construir la URL con los parámetros seleccionados
      let queryParams = [];

      if (selectedPeriodo.value) {
        queryParams.push(
          `periodo=${encodeURIComponent(selectedPeriodo.value)}`
        );
      }

      if (selectedFacultad.value) {
        queryParams.push(
          `facultad=${encodeURIComponent(selectedFacultad.value)}`
        );
      }

      if (selectedPrograma.value) {
        queryParams.push(
          `programa=${encodeURIComponent(selectedPrograma.value)}`
        );
      }

      // Combinar los parámetros en la URL
      if (queryParams.length > 0) {
        url += "?" + queryParams.join("&");
      }

      const response = await axios.get<DataItem[]>(url);
      data.value = response.data;
    };

    onMounted(async () => {
      const response = await axios.get<DataItem[]>(
        "https://www.datos.gov.co/resource/r86y-229a.json"
      );
      data.value = response.data;

      periodos.value = [...new Set(response.data.map((item) => item.periodo))];

      facultades.value = [
        ...new Set(response.data.map((item) => item.facultad)),
      ];

      programas.value = [
        ...new Set(response.data.map((item) => item.programa)),
      ];
    });

    return {
      data,
      periodos,
      facultades,
      programas,
      selectedPeriodo,
      selectedFacultad,
      selectedPrograma,
      fetchData,
    };
  },
});
</script>
