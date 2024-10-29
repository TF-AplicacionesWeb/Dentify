<script>
import changelangComponent from '/src/public/changelang.component.vue'
export default {
  name: "metrics.component.vue",
  components: { changelangComponent },
  data() {
    return {
      selectedMetrics: null,
      metrics: [
        { name: 'Semanal', code: '' },
        { name: 'Mensual', code: '' },
        { name: 'Anual', code: '' }
      ]
    };
  }
}
</script>

<template>
  <h1 class="mt-24 text-4xl mb-5">{{ $t('Metrics.header') }}</h1>
  <!--<h1 class="mt-24 text-4xl mb-5"></h1>-->
  <div class="flex justify-between">
    <pv-Dropdown class="bg-[#D1F2EB] shadow-md w-4/12 rounded-3xl flex items-center justify-between p-4"
                 v-model="selectedMetrics"
                 :options="metrics"
                 showClear
                 optionLabel="name"
                 :placeholder="$t('Metrics.dropdown')">
    </pv-Dropdown>
    <pv-button class="button">{{ $t('Metrics.button') }}</pv-button>
  </div>
</template>

<style scoped>

.button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #2C3E50;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  color: white;
}

.button:hover {
  background-color: #2C3E40;
  color: black;
  border-color: #2C3E50;
}

</style>