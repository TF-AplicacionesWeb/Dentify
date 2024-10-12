<script>
import { DashboardApiService } from "../services/dashboard-api.service.js";

export default {
  name: "dashboard",
  data() {
    return {
      inventory: [],
      appointments: [],
      payments: [],
      dashboardApiService: new DashboardApiService(),
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.inventory = await this.dashboardApiService.getInventory();
        this.appointments = await this.dashboardApiService.getAppointments();
        this.payments = await this.dashboardApiService.getPayments();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
  }
};
</script>

<template>
  <div class="mt-24 p-6 max-w-5xl mx-auto">
    <h1 class="text-left text-4xl font-bold mb-10">Dashboard</h1>

    <div class="dashboard-container bg-green-200 p-4 rounded-lg mb-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 justify-center items-center">
        <pv-card
            v-for="item in inventory"
            :key="item.material_id"
            class="bg-green-200 p-4"
        >
          <template #content>
            <p class="font-semibold text-lg">{{ item.material_name }}</p>
            <p>Cantidad: <span class="font-medium">{{ item.quantity }}</span></p>
            <p>Precio Unitario: <span class="font-medium">${{ item.unit_price }}</span></p>
            <p>Última actualización: <span class="font-medium">{{ item.last_updated }}</span></p>
          </template>
        </pv-card>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/2 bg-green-50 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-left">Citas para hoy</h2>
        <pv-card
            v-for="appointment in appointments"
            :key="appointment.appointment_id"
            class="bg-green-200 mb-4 p-4 rounded-md shadow-md"
        >
          <template #content>
            <p>Dentista: <span class="font-medium">{{ appointment.dentist_dni }}</span></p>
            <p>Fecha: <span class="font-medium">{{ new Date(appointment.appointment_date).toLocaleDateString() }}</span></p>
            <p>Hora: <span class="font-medium">{{ new Date(appointment.appointment_date).toLocaleTimeString() }}</span></p>
            <p>Razón: <span class="font-medium">{{ appointment.reason }}</span></p>
          </template>
        </pv-card>
      </div>

      <div class="w-full md:w-1/2 bg-green-50 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-left">Pagos recientes</h2>
        <pv-card
            v-for="payment in payments"
            :key="payment.payment_id"
            class="bg-green-200 mb-4 p-4 rounded-md shadow-md"
        >
          <template #content>
            <p>ID de Pago: <span class="font-medium">{{ payment.id }}</span></p>
            <p>Cantidad: <span class="font-medium">${{ payment.amount }}</span></p>
            <p>Fecha de Pago: <span class="font-medium">{{ new Date(payment.payment_date).toLocaleDateString() }}</span></p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 1rem;
  border-radius: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 1rem;
}

.pv-card {
  box-shadow: none;
  padding: 0.5rem;
  text-align: center;
}

.pv-card p {
  margin: 0.2rem 0;
}
</style>
