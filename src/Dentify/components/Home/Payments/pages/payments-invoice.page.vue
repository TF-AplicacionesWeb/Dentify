<script>
import { PaymentsService } from "../services/payments.service.js";
import cardInvoiceComponent from "../components/card-invoice.component.vue";
import {mapGetters} from "vuex";

export default {
  name: "invoice.vue",
  computed: {
    ...mapGetters(['getUser']),

    userLogged(){

      return this.getUser;
    }
  },
  components: {
    cardInvoiceComponent
  },
  data() {
    return {
      pendingPayments: [],
      selectedInvoice: null,
      showInvoiceCard: false
    };
  },
  methods: {

    goToAppointments() {
      this.$router.push('/home/payments/appointments');
    },
    openInvoice(payment) {
      this.selectedInvoice = {
        id: payment.id,
        name: payment.name,
        dni: payment.dni,
        date: new Date(payment.appointment_date).toLocaleDateString(),
        time: new Date(payment.appointment_date).toLocaleTimeString(),
        description: payment.reason,
        amount: payment.amount
      };

      this.showInvoiceCard = true;
    },

    closeInvoiceCard() {
      this.showInvoiceCard = false;
    }
  },
  async created() {
    const paymentsService = new PaymentsService();
    this.pendingPayments = await paymentsService.getDataForInvoice(this.userLogged.id);

    for (const payment of this.pendingPayments) {

      let response = await paymentsService.getPaymentForAppointment(this.userLogged.id, payment.id);

      payment.amount = response.amount;

    }


  }
};
</script>

<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5">
    <h1 class="text-left text-4xl font-bold mb-5">{{ $t('paymentsInvoice.title') }}</h1>
    <h3 class="text-left text-2xl font-bold mb-4">{{ $t('paymentsInvoice.invoices') }}</h3>

    <div class="toolbar flex justify-start items-center gap-2 mb-5">
      <pv-button
          :label="$t('paymentsInvoice.appointmentsToPay')"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg whitespace-nowrap"
          @click="goToAppointments"
      />
    </div>

    <table class="payments-table w-full border-collapse">
      <thead>
      <tr class="bg-sky-950 text-white">
        <th class="p-3">{{ $t('paymentsInvoice.patient') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.dni') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.date') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.time') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.duration') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.appointmentType') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.dentist') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.status') }}</th>
        <th class="p-3">{{ $t('paymentsInvoice.invoice') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="payment in pendingPayments" :key="payment.id" class="border-t">
        <td class="p-3 text-center">{{ payment.name }}</td>
        <td class="p-3 text-center">{{ payment.dni }}</td>
        <td class="p-3 text-center">{{ new Date(payment.appointment_date).toLocaleDateString() }}</td>
        <td class="p-3 text-center">{{ new Date(payment.appointment_date).toLocaleTimeString() }}</td>
        <td class="p-3 text-center">{{ payment.duration_minutes }} min</td>
        <td class="p-3 text-center">{{ payment.reason }}</td>
        <td class="p-3 text-center">{{ payment.dentist }}</td>
        <td class="p-3 text-center">{{ payment.payment_status ? $t('paymentsInvoice.paid') : $t('paymentsInvoice.pending') }}</td>
        <td class="p-3 text-center">
          <i class="pi pi-file cursor-pointer" @click="openInvoice(payment)"></i>
        </td>
      </tr>
      </tbody>
    </table>

    <cardInvoiceComponent
        v-if="showInvoiceCard"
        :invoice="selectedInvoice"
        @close="closeInvoiceCard"
    />
  </div>
</template>


<style scoped>
.payments-container {
  padding: 20px;
  max-width: 1200px;
  margin-top: 80px;
}

.payments-table {
  border: 1px solid #ccc;
}

.payments-table th,
.payments-table td {
  border: 1px solid #ccc;
}
</style>
