<script>
import { PaymentsService } from "../services/payments.service.js";
import PaymentCardComponent from "../components/payments-card.component.vue";
import {mapGetters} from "vuex";

export default {
  name: "appointments",
  computed: {
    ...mapGetters(['getUser']),

    userLogged(){
      return this.getUser;
    }
  },
  components: {
    PaymentCardComponent,
  },
  methods: {
    async selectAppointment(appointment) {
      this.selectedAppointment = appointment;

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
    async setAmount(amount = null){
      this.amount = amount;
    },
    async confirmPayment(appointmentId) {
      const paymentsService = new PaymentsService();

      try {
        const paymentData = {
          amount: parseInt(this.amount),
          payment_date: new Date().toISOString()

        };

        const paymentId = await paymentsService.createPayment(paymentData);

        await paymentsService.updateAppointmentStatus(appointmentId, {
          payment_status: true,
          payment_id: paymentId,
          completed: true

        });

        const appointmentIndex = this.pendingPayments.findIndex(p => p.id === appointmentId);
        if (appointmentIndex !== -1) {
          this.pendingPayments.splice(appointmentIndex, 1);
        }

        alert('El pago ha sido confirmado con éxito.');

      } catch (error) {
        console.error("Error actualizando el estado del pago:", error);
        alert('Hubo un error al confirmar el pago.');
      } finally {
        this.closePaymentCard();
      }
    },
    goToInvoice() {
      this.$router.push("/home/payments/invoices");
    },
  },
  data() {
    return {
      amount: null,
      pendingPayments: [],
      selectedAppointment: null,
      showPaymentCard: false,
      allPayments: [],
    };
  },
  async created() {
    const paymentsService = new PaymentsService()
    this.allPayments = await paymentsService.getDataForAppointments(this.userLogged.id);
    this.pendingPayments = this.allPayments.filter(payment => payment.payment_status === false);

  },
};
</script>
<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5">
    <h1 class="text-left text-4xl font-bold mb-5">{{ $t('payments.title') }}</h1>
    <h3 class="text-left text-2xl font-bold mb-4">{{ $t('payments.pendingAppointments') }}</h3>

    <div class="toolbar flex justify-between items-center gap-2 mb-5">

      <pv-button
          :label="$t('payments.invoicesButton')"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg"
          @click="goToInvoice"
      />
    </div>

    <table class="payments-table w-full border-collapse">
      <thead>
      <tr class="bg-sky-950 text-white">
        <th class="p-3"></th>
        <th class="p-3">{{ $t('payments.patient') }}</th>
        <th class="p-3">{{ $t('payments.dni') }}</th>
        <th class="p-3">{{ $t('payments.date') }}</th>
        <th class="p-3">{{ $t('payments.time') }}</th>
        <th class="p-3">{{ $t('payments.duration') }}</th>
        <th class="p-3">{{ $t('payments.appointmentType') }}</th>
        <th class="p-3">{{ $t('payments.dentist') }}</th>
        <th class="p-3">{{ $t('payments.status') }}</th>
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
        <td class="p-3 text-center">{{ payment.payment_status ? $t('payments.paid') : $t('payments.pending') }}</td>
      </tr>
      </tbody>
    </table>

    <div class="actions mt-5 flex justify-center">
      <pv-button
          :label="$t('payments.registerPayment')"
          class="register-button bg-sky-950 text-white px-5 py-2 rounded-full text-lg"
          @click="openPaymentCard"
      />
    </div>
    <PaymentCardComponent
        v-if="showPaymentCard"
        :appointment="selectedAppointment"
        @close="closePaymentCard"
        @confirmPayment="confirmPayment"
        @setAmount="setAmount"
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
