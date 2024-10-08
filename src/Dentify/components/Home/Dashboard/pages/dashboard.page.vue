<script>
import { DashboardApiService } from "../services/dashboard-api.service.js";

export default {
  name: "dashboard",
  data() {
    return {
      inventory: [],
      appointments: [],
      payments: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Obtener datos de inventario
      DashboardApiService.getInventory()
          .then((response) => {
            this.inventory = response.data;
          })
          .catch((error) => {
            console.error("Error al obtener inventario:", error);
          });

      // Obtener datos de citas
      DashboardApiService.getAppointments()
          .then((response) => {
            this.appointments = response.data;
          })
          .catch((error) => {
            console.error("Error al obtener citas:", error);
          });

      // Obtener datos de pagos
      DashboardApiService.getPayments()
          .then((response) => {
            this.payments = response.data;
          })
          .catch((error) => {
            console.error("Error al obtener pagos:", error);
          });
    }
  }
};
</script>

<template>
  <div class="dashboard-container mt-24">
    <h1 class="dashboard-title">Dashboard</h1>
    <!-- Lista de inventario -->
    <div class="cards-bar">
      <pv-card
          v-for="item in inventory"
          :key="item.material_id"
          class="dashboard-card info-card"
      >
        <template #content>
          <p>{{ item.material_name }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
          <p>Precio Unitario: {{ item.unit_price }}</p>
          <p>Última actualización: {{ item.last_updated }}</p>
        </template>
      </pv-card>
    </div>

    <div class="appointments-payments-container">
      <div class="appointments">
        <h2>Citas para hoy</h2>
        <pv-card
            v-for="appointment in appointments"
            :key="appointment.appointment_id"
            class="dashboard-card appointments-card"
        >
          <template #content>
            <p>Dentista: {{ appointment.dentist_dni }}</p>
            <p>Fecha: {{ new Date(appointment.appointment_date).toLocaleDateString() }}</p>
            <p>Hora: {{ new Date(appointment.appointment_date).toLocaleTimeString() }}</p>
            <p>Razón: {{ appointment.reason }}</p>
          </template>
        </pv-card>
      </div>


      <div class="payments">
        <h2>Pagos recientes</h2>
        <pv-card
            v-for="payment in payments"
            :key="payment.payment_id"
            class="dashboard-card payments-card"
        >
          <template #content>
            <p>ID de Pago: {{ payment.id }}</p>
            <p>Cantidad: {{ payment.amount }}</p>
            <p>Fecha de Pago: {{ new Date(payment.payment_date).toLocaleDateString() }}</p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal del Dashboard */
.dashboard-container {
  padding: 20px;
  width: 1200px;
}

/* Estilo del título */
.dashboard-title {
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 0;
}

/* Barra de Cards */
.cards-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
}

/* Estilo de las Cards */
.dashboard-card {
  width: 100%;
  background-color: #D1F2EB;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.dashboard-card.info-card {
  border-radius: 0;
}

/* Contenedor de Citas y Pagos */
.appointments-payments-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Sección de Citas */
.appointments {
  width: 48%;
}

/* Sección de Pagos */
.payments {
  width: 48%;
}

/* Estilo de las Cards de Citas y Pagos */
.appointments-card,
.payments-card {
  margin-bottom: 20px;
  background-color: #A9DFBF;
  padding: 15px;
}

/* Estilo de los subtítulos */
h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
