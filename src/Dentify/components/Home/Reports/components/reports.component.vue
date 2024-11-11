<script>
import changelangComponent from '/src/public/changelang.component.vue'
export default {
  name: "reports.component.vue",
  components: { changelangComponent },
  data() {
    return {
      selectedReport: null,
      fromDate: null,
      toDate: null,
      isReportVisible: false,
      reportTypes: [
        { name: 'Informe Semanal', code: 'semanal' },
        { name: 'Informe Mensual', code: 'mensual' },
        { name: 'Informe Anual', code: 'anual' }
      ],
      dateOptions: [
        { name: 'Enero', code: '01' },
        { name: 'Febrero', code: '02' }
      ]
    };
  },
  methods: {
    showReport() {
      this.isReportVisible = true;
    },
    closeModal() {
      this.isReportVisible = false;
    }
  }
}
</script>

<template>
  <h1 class="mt-24 text-4xl mb-5">{{ $t('Reports.header') }}</h1>

  <div class="flex items-center mb-5 space-x-4">
    <pv-Dropdown class="bg-[#D1F2EB] shadow-md w-4/12 rounded-3xl p-4"
                 v-model="selectedReport"
                 :options="reportTypes"
                 showClear
                 optionLabel="name"
                 :placeholder="$t('Reports.dropdown')">
    </pv-Dropdown>

    <span class="text-lg">{{ $t('Reports.from') }}</span>
    <pv-Dropdown class="bg-[#D1F2EB] shadow-md w-3/12 rounded-3xl p-4"
                 v-model="fromDate"
                 :options="dateOptions"
                 showClear
                 :placeholder="$t('Reports.date')">
    </pv-Dropdown>

    <span class="text-lg">{{ $t('Reports.to') }}</span>
    <pv-Dropdown class="bg-[#D1F2EB] shadow-md w-3/12 rounded-3xl p-4"
                 v-model="toDate"
                 :options="dateOptions"
                 showClear
                 :placeholder="$t('Reports.date')">
    </pv-Dropdown>

    <pv-button class="button" @click="showReport">{{ $t('Reports.button') }}</pv-button>
  </div>

  <div v-if="isReportVisible" class="report-container bg-[#D1F2EB] p-5 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-3">{{ $t('Reports.header') }}</h2>
    <p class="text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae sollicitudin orci. Proin mollis elit nec molestie pretium. Nullam mollis leo viverra laoreet pretium. Donec at aliquet est. Cras tincidunt justo eget nibh commodo gravida. Nulla quis dolor venenatis, interdum nisi scelerisque, porttitor eros. Sed nisi ante, ornare nec neque in, egestas venenatis mi. Mauris sed erat erat. Aliquam ornare hendrerit enim viverra aliquam.
      Donec luctus, odio vel blandit tristique, lacus leo interdum ligula, sit amet vehicula elit enim ac nulla. Nulla non nulla at massa aliquam eleifend cursus vel nulla. Pellentesque at pretium velit. Nulla porttitor, est eget sollicitudin vestibulum, tortor nibh pulvinar nunc, et rutrum erat eros eget lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam imperdiet tortor nunc. Ut hendrerit lacus eget molestie egestas. Donec hendrerit turpis justo, at sollicitudin sapien sagittis in. Vivamus tempor elementum nisi in tempus. Phasellus ultricies risus a tellus condimentum, quis varius libero malesuada. Cras tincidunt egestas tortor, non porttitor sapien euismod ac.
      Aenean ultricies enim eget justo tristique, et blandit nisi tempor. Donec tincidunt malesuada est ac porttitor. Maecenas et congue eros. In ex mi, condimentum ut cursus non, tincidunt at erat. Fusce vitae suscipit orci. In dui velit, pretium non rhoncus porttitor, blandit ac ipsum. Suspendisse eu feugiat lacus. Nunc dapibus venenatis rhoncus.
    </p>
    <pv-button class="button mt-5" @click="closeModal">{{ $t('Reports.close') }}</pv-button>
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
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.button:hover {
  background-color: #2C3E40;
  color: black;
  border-color: #2C3E50;
}

.report-container {
  max-width: 600px;
  margin-top: 20px;
  color: #2C3E50;
}
</style>