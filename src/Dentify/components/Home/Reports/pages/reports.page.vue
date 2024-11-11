<template>
  <div v-if="report" class="inventory-report mt-24">
    <h1 class="justify-center text-center title">{{ $t('reports.inventoryReport') }}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.averageUnitPrice') }}:</h3>
          <p>{{ report.averageUnitPrice || 0 }}</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.minPrice') }}:</h3>
          <p>{{ report.minPrice || 0 }}</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.maxPrice') }}:</h3>
          <p>{{ report.maxPrice || 0 }}</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.totalQuantity') }}:</h3>
          <p>{{ report.totalQuantity || 0 }}</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.averagePerProduct') }}:</h3>
          <p>{{ report.averagePerProduct || 0 }}</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.mostProduct') }}:</h3>
          <p>{{ report.mostProduct?.name || 'N/A' }} ({{ report.mostProduct?.quantity || 0 }})</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.minProduct') }}:</h3>
          <p>{{ report.minProduct?.name || 'N/A' }} ({{ report.minProduct?.quantity || 0 }})</p>
        </template>
      </pv-card>

      <pv-card class="pv-card flex items-center justify-center">
        <template #content>
          <h3>{{ $t('reports.totalInventoryValue') }}:</h3>
          <p>{{ report.totalValueInventory || 0 }}</p>
        </template>
      </pv-card>
    </div>
  </div>

  <div v-if="quantityData && productsData && inventoryValueData" class="mt-24 container">
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
      <Chart class="chart-container" type="bar" :data="quantityData" :options="chartOptions"/>
      <Chart class="chart-container" type="bar" :data="productsData" :options="chartOptions"/>
      <Chart class="chart-container" type="pie" :data="inventoryValueData" :options="chartOptions"/>
      <Chart class="chart-container" type="bar" :data="productsTotalPriceData" :options="chartOptions"/>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import {ReportsService} from "../services/reports.service.js";

export default {
  name: "reports.page.vue",
  computed: {
    ...mapGetters(["getUser"]),
    userLogged() {
      return this.getUser;
    },
  },
  async created() {
    await this.getInventoryReport();
  },
  data() {
    return {
      products: [],
      productsData: null,
      productsPriceData: null,
      productsTotalPriceData: null,

      report: null,
      quantityData: null,
      inventoryValueData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: "Metrics",
          },
        },
      },
    };
  },
  methods: {
    async getInventoryReport() {
      const reportService = new ReportsService();
      try {
        this.report = await reportService.generateReport(this.userLogged.id);
        this.products = await reportService.getDataInventory(this.userLogged.id);


        this.productsData = {
          labels: this.products.map((product) => product.material_name),
          datasets: [
            {
              label: "Quantity",
              backgroundColor: "#42A5F5",
              data: this.products.map((product) => product.quantity),
            },
            {
              label: "Price",
              backgroundColor: "#FFC107",
              data: this.products.map((product) => product.unit_price),
            },
          ],
        };

        this.quantityData = {
          labels: ["Min and Max Quantity per Product"],
          datasets: [
            {
              label: this.report.minProduct.name,
              backgroundColor: "#182e3f",
              data: [this.report.minProduct.quantity],
            },
            {
              label: this.report.mostProduct.name,
              backgroundColor: "#1a5788",
              data: [this.report.mostProduct.quantity],
            },
          ],
        };

        this.productsTotalPriceData = {
          labels: this.products.map((product) => product.material_name),
          datasets: [
            {
              label: "Total Price",
              backgroundColor: "#6dce82",
              data: this.products.map((product) => product.quantity * product.unit_price),
            }
          ],
        };

        this.inventoryValueData = {
          labels: this.products.map((product) => product.material_name),
          datasets: [
            {
              label: "Quantity",
              backgroundColor: this.products.map((product, index) => {
                const colors = ["#42A5F5", "#66BB6A", "#FFA726", "#FF7043", "#AB47BC", "#29B6F6", "#FFCA28"];
                return colors[index % colors.length];
              }),
              data: this.products.map((product) => product.quantity),
            },
          ],
        };
      } catch (error) {
        console.error("Error al generar el reporte de inventario:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  z-index: -1;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.pv-card {
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.pv-card h3 {
  font-weight: bold;
}

.title {
  font-weight: bold;
  font-size: 1.8em;
}
</style>
