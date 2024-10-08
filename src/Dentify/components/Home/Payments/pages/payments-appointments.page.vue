<script>
import { PaymentsService } from "../services/payments.service.js";
import PaymentCardComponent from "../components/payments-card.component.vue";

export default {
  name: "appointments",
  components: {
    PaymentCardComponent,
  },
  methods: {
    async selectAppointment(appointment) {
      this.selectedAppointment = appointment;

      //codigo comentado
      //esta funcionalidad no va acá, va cuando se confirme el pago

      //const paymentsService = new PaymentsService();
      /*
      await paymentsService.updateAppointmentStatus(appointment.id, {
        payment_status: true
      });*/
    },
    openPaymentCard() {
      if (this.selectedAppointment) {
        this.showPaymentCard = true;
      } else {
        alert("Selecciona una cita para registrar el pago.");
      }
    },
    closePaymentCard() {
      this.showPaymentCard = false;
    },
    async confirmPayment(appointmentId) {
      const appointment = this.pendingPayments.find((p) => p.id === appointmentId);
      if (appointment) {
        //codigo comentado para no poner en true un pago
        //generar una funcionalidad para la confirmacion de pago sincronizando con la fakeapi

        //appointment.payment_status = true;
        await this.selectAppointment(appointment);
      }
      this.closePaymentCard();
    },
    goToInvoice() {
      this.$router.push("/home/payments/invoices");
    },
  },
  data() {
    return {
      pendingPayments: [],
      selectedAppointment: null,
      showPaymentCard: false,
      allPayments: [],
    };
  },
  async created() {
    const paymentsService = new PaymentsService()
    this.allPayments = await paymentsService.getDataForAppointments();
    this.pendingPayments = this.allPayments.filter(payment => payment.payment_status === false);

  },
};
</script>

<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5">
    <h1 class="text-left text-4xl font-bold mb-5">Pagos</h1>
    <h3 class="text-left text-2xl font-bold mb-4">Citas a pagar:</h3>

    <div class="toolbar flex justify-between items-center gap-2 mb-5">
      <div class="search-container w-full flex items-center justify-between">
        <div class="search-input-container flex items-center bg-teal-100 rounded-full px-2 py-1 w-1/2">
          <i class="pi pi-search mr-2"/>
          <pv-inputtext
              placeholder="Buscar"
              class="search-input bg-teal-100 w-full outline-none border-b-2 border-teal-700 transition duration-300 ease-in-out"
          />
          <i class="pi pi-cog ml-2 cursor-pointer" @click="$emit('openSettings')"/>
        </div>
      </div>
      <pv-button
          label="Facturas"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg"
          @click="goToInvoice"
      />
    </div>

    <table class="payments-table w-full border-collapse">
      <thead>
      <tr class="bg-sky-950 text-white">
        <th class="p-3"></th>
        <th class="p-3">Paciente</th>
        <th class="p-3">DNI</th>
        <th class="p-3">Fecha</th>
        <th class="p-3">Hora</th>
        <th class="p-3">Duración</th>
        <th class="p-3">Tipo de cita</th>
        <th class="p-3">Odontólogo</th>
        <th class="p-3">Estado</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="payment in pendingPayments" :key="payment.id" class="border-t">
        <td class="p-3 text-center">
          <input
              type="checkbox"
              @change="selectAppointment(payment)"
              :checked="payment.payment_status"
          />
        </td>
        <td class="p-3 text-center">{{ payment.name }}</td>
        <td class="p-3 text-center">{{ payment.dni }}</td>
        <td class="p-3 text-center">{{ new Date(payment.appointment_date).toLocaleDateString() }}</td>
        <td class="p-3 text-center">{{ new Date(payment.appointment_date).toLocaleTimeString() }}</td>
        <td class="p-3 text-center">{{ payment.duration_minutes }}</td>
        <td class="p-3 text-center">{{ payment.reason }}</td>
        <td class="p-3 text-center">{{ payment.dentist}}</td>
        <td class="p-3 text-center">{{ payment.payment_status ? 'Pagado' : 'Pendiente' }}</td>
      </tr>
      </tbody>
    </table>

    <div class="actions mt-5 flex justify-center">
      <pv-button
          label="Registrar pago"
          class="register-button bg-sky-950 text-white px-5 py-2 rounded-full text-lg"
          @click="openPaymentCard"
      />
    </div>
    <PaymentCardComponent
        v-if="showPaymentCard"
        :appointment="selectedAppointment"
        @close="closePaymentCard"
        @confirmPayment="confirmPayment"
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
  background-color: #d1f2eb;
}

.search-input {
  background-color: #d1f2eb;
  outline: none;
  border-bottom: 2px solid #2c3e50;
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
