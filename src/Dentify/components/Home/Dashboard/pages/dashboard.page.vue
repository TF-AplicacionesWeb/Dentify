<template>
  <div class="dashboard-container mt-24">
    <div class="flex justify-center items-center">
      <div class="dashboard-title" v-if="this.username.trial">Trial Plan</div>
      <div class="dashboard-title" v-else>Full Plan</div>
    </div>


    <h1 class="dashboard-title">Dashboard</h1>

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

<script>
import DashboardApiService from '../services/dashboard-api.service.js';
import {mapGetters} from 'vuex';

export default {
  name: "dashboard",
  computed: {
    ...mapGetters(['getUser']),
    username() {
      return this.getUser;
    }
  },
  data() {
    return {
      inventory: [],
      appointments: [],
      payments: []
    };
  },
  async created() {
    await this.fetchData();
    console.log(this.username);
  },
  methods: {
    async fetchData() {
      try {
        this.inventory = await DashboardApiService.getInventory(this.username.id);
        this.appointments = await DashboardApiService.getAppointments(this.username.id);
        this.payments = await DashboardApiService.getPayments(this.username.id);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
  }
};
</script>

<style scoped>

.dashboard-container {
  padding: 20px;
  width: 1200px;
}


.dashboard-title {
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 0;
}

.cards-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
}

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


.appointments-payments-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}


.appointments {
  width: 48%;
}


.payments {
  width: 48%;
}

.appointments-card,
.payments-card {
  margin-bottom: 20px;
  background-color: #A9DFBF;
  padding: 15px;
}


h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
