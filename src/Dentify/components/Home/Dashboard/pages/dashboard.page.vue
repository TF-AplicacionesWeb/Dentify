<template>
  <div class="dashboard-container mt-24">
    <div class="flex justify-center items-center">
      <div class="dashboard-title" v-if="this.username.trial">{{ $t('dashboard.trialPlan') }}</div>
      <div class="dashboard-title" v-else>{{ $t('dashboard.fullPlan') }}</div>
    </div>

    <h1 class="dashboard-title">{{ $t('dashboard.dashboard') }}</h1>

    <div class="cards-bar">
      <pv-card
          v-for="item in inventory"
          :key="item.material_id"
          class="dashboard-card info-card"
      >
        <template #content>
          <p>{{ item.material_name }}</p>
          <p>{{ $t('dashboard.quantity') }}: {{ item.quantity }}</p>
          <p>{{ $t('dashboard.unitPrice') }}: {{ item.unit_price }}</p>
          <p>{{ $t('dashboard.lastUpdated') }}: {{ item.last_updated }}</p>
        </template>
      </pv-card>
    </div>

    <div class="appointments-payments-container">
      <div class="appointments">
        <h2>{{ $t('dashboard.todayAppointments') }}</h2>
        <pv-card
            v-for="appointment in appointments"
            :key="appointment.appointment_id"
            class="dashboard-card appointments-card"
        >
          <template #content>
            <p>{{ $t('dashboard.dentist') }}: {{ appointment.dentist_dni }}</p>
            <p>{{ $t('dashboard.date') }}: {{ new Date(appointment.appointment_date).toLocaleDateString() }}</p>
            <p>{{ $t('dashboard.time') }}: {{ new Date(appointment.appointment_date).toLocaleTimeString() }}</p>
            <p>{{ $t('dashboard.reason') }}: {{ appointment.reason }}</p>
          </template>
        </pv-card>
      </div>

      <div class="payments">
        <h2>{{ $t('dashboard.recentPayments') }}</h2>
        <pv-card
            v-for="payment in payments"
            :key="payment.payment_id"
            class="dashboard-card payments-card"
        >
          <template #content>
            <p>{{ $t('dashboard.paymentId') }}: {{ payment.id }}</p>
            <p>{{ $t('dashboard.amount') }}: {{ payment.amount }}</p>
            <p>{{ $t('dashboard.paymentDate') }}: {{ new Date(payment.payment_date).toLocaleDateString() }}</p>
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
