<script>
export default {
  name: "payments.vue",
  data(){
    return {
      cards: [
        {
          title: 'Organización Eficiente',
          description: 'Gestionar tus citas y pagos de manera organizada mejora la productividad y reduce el estrés al mantener todo bajo control.'
        },
        {
          title: 'Ahorro de Tiempo',
          description: 'Un sistema bien gestionado de citas y pagos permite ahorrar tiempo, evitando errores y olvidos de citas importantes.'
        },
        {
          title: 'Mejor Experiencia para el Cliente',
          description: 'Una administración de citas y pagos adecuada garantiza una experiencia fluida y satisfactoria para los pacientes.'
        }
      ]
    }
  },

  methods: {

    goToAppointments() {
      this.$router.push('/home/payments/appointments');
    },
    goToInvoices() {
      this.$router.push('/home/payments/invoices');
    }
  }
}
</script>

<template>
  <div class="payments-container mx-auto mt-20 w-1/2 p-5" v-if="$route.path === '/home/payments'">
    <h1 class="text-left text-4xl font-bold mb-5">{{ $t('paymentMain.title') }}</h1>
    <h3 class="text-left text-2xl font-bold mb-4">{{ $t('paymentMain.pendingAppointments') }}</h3>

    <div class="toolbar flex justify-start items-center gap-2 mb-5">
      <pv-button
          :label="$t('paymentMain.pendingAppointmentsButton')"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg whitespace-nowrap"
          @click="goToAppointments"
      />
      <pv-button
          :label="$t('paymentMain.invoicesButton')"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg"
          @click="goToInvoices"
      />
    </div>
  </div>


  <div class="container mx-auto mt-10 p-6">
    <h1 class="text-3xl font-bold text-center mb-10 mt-10">{{ $t('paymentMain.benefitsTitle') }}</h1>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <pv-card class="pv-card"
               v-for="(card, index) in cards"
               :key="index"
      >
        <template #header>
          <p class="text-center font-bold">{{ card.title }}</p>
        </template>
        <template #content>
          <p class="text-center mt-4">{{ card.description }}</p>
        </template>
      </pv-card>
    </div>
  </div>

  <router-view></router-view>
</template>



<style scoped>
.payments-container {
  padding: 20px;
  max-width: 1200px;
  margin-top: 80px;
}
.pv-card {
  width: 80%;
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
</style>
