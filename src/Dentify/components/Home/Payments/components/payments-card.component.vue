<script>
export default {
  name: "payments-card.vue",
  props: {
    appointment: Object
  },
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      amount: '',
      paymentConfirmed: false
    };
  },
  methods: {
    makePayment() {
      this.$emit('confirmPayment', this.appointment.appointment_id);
      this.paymentConfirmed = true;
      this.$emit('close');
    },
    goBack() {
      this.$emit('close');
    }
  }
};
</script>

<template>
  <div class="overlay">
    <div class="payment-card p-5 shadow-lg rounded-lg bg-light-blue">
      <h1 class="text-3xl font-bold mb-4 text-center text-black">Registrar Pago</h1>

      <h2 class="text-xl font-semibold mb-2 text-gray-800">Información de la cita</h2>
      <div class="details mb-4 text-black">
        <p><strong>Nombre del paciente:</strong> {{ appointment.name.first_name }}</p>
        <p><strong>Apellido del paciente:</strong> {{ appointment.name.last_name }}</p>
        <p><strong>DNI del paciente:</strong> {{ appointment.dni }}</p>
        <p><strong>Fecha:</strong> {{ new Date(appointment.appointment_date).toLocaleDateString() }}</p>
        <p><strong>Hora:</strong> {{ appointment.time }}</p>
        <p><strong>Tipo de cita:</strong> {{ appointment.reason }}</p>
        <p><strong>Nombre del odontólogo:</strong> {{ appointment.dentist.first_name }} {{
            appointment.dentist.last_name
          }}</p>
        <p><strong>Duración de la cita:</strong> {{ appointment.duration }}</p>
      </div>

      <h2 class="text-xl font-semibold mb-2 text-gray-800">Datos del pago</h2>
      <form @submit.prevent="makePayment">
        <div class="mb-4">
          <label for="email" class="block text-black">Correo electrónico:</label>
          <input id="email" v-model="email" type="email" class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="firstName" class="block text-black">Nombres:</label>
          <input id="firstName" v-model="firstName" type="text"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-black">Apellidos:</label>
          <input id="lastName" v-model="lastName" type="text" class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="amount" class="block text-black">Monto:</label>
          <input id="amount" v-model="amount" type="number" class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="btn bg-dark-blue text-white px-4 py-2 rounded shadow">Pagar</button>
        </div>
        <div class="mt-4 text-center">
          <a href="#" @click.prevent="goBack" class="text-sm text-dark-blue">Regresar a citas a pagar</a>
        </div>
      </form>

      <div v-if="paymentConfirmed" class="mt-4 p-4 bg-green-100 text-green-700 rounded">
        <p>¡Pago confirmado!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-card {
  background-color: #e8f9f8;
  border-radius: 16px;
  width: 400px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  cursor: pointer;
  background-color: #2d3748;
}

.btn:hover {
  background-color: #1a202c;
}

.bg-light-blue {
  background-color: #e8f9f8;
}

.text-dark-blue {
  color: #2d3748;
}

.text-center {
  text-align: center;
}
</style>
