<script>
import { PaymentsService } from "../services/payments.service.js";
import cardInvoiceComponent from "../components/card-invoice.component.vue";

export default {
  name: "invoice.vue",
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
    this.pendingPayments = await paymentsService.getDataForInvoice();
  }
};
</script>

<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5">
    <h1 class="text-left text-4xl font-bold mb-5">Pagos</h1>
    <h3 class="text-left text-2xl font-bold mb-4">Facturas:</h3>

    <div class="toolbar flex justify-between items-center gap-2 mb-5">
      <div class="search-container w-full flex items-center justify-between">
        <div class="search-input-container flex items-center bg-teal-100 rounded-full px-2 py-1 w-1/2">
          <i class="pi pi-search mr-2"/>
          <pv-inputtext placeholder="Buscar"
                        class="search-input bg-teal-100 w-full outline-none border-b-2 border-teal-700 transition duration-300 ease-in-out"/>
          <i class="pi pi-cog ml-2 cursor-pointer" @click="$emit('openSettings')"/>
        </div>
      </div>
      <pv-button label="Citas a pagar"
                 class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg whitespace-nowrap"
                 @click="goToAppointments"/>
    </div>

    <table class="payments-table w-full border-collapse">
      <thead>
      <tr class="bg-sky-950 text-white">
        <th class="p-3">Paciente</th>
        <th class="p-3">DNI</th>
        <th class="p-3">Fecha</th>
        <th class="p-3">Hora</th>
        <th class="p-3">Duración</th>
        <th class="p-3">Tipo de cita</th>
        <th class="p-3">Odontólogo</th>
        <th class="p-3">Estado</th>
        <th class="p-3">Factura</th>
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
        <td class="p-3 text-center">{{ payment.dentist}}</td>
        <td class="p-3 text-center">{{ payment.payment_status ? 'Pagado' : 'Pendiente' }}</td>
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

.search-input-container {
  background-color: #D1F2EB;
}

.search-input {
  background-color: #D1F2EB;
  outline: none;
  border-bottom: 2px solid #2C3E50;
  transition: border-bottom 0.3s ease;
}

.payments-table {
  border: 1px solid #ccc;
}

.payments-table th,
.payments-table td {
  border: 1px solid #ccc;
}
</style>
