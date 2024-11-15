<template>
  <div class="bg-[#d1f2eb] min-h-screen mt-28 p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-[#082f49]">{{ $t('appointments.title') }}</h1>
    </div>
    <div class="flex items-center justify-end mb-8 mx-4">
      <button
          @click="showAddAppointmentModal = true"
          class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors mx-4"
      >
        {{ $t('appointments.addAppointment') }}
      </button>

      <button
          @click="showDeleteAppointmentModal = true"
          class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors"
      >
        {{ $t('appointments.deleteAppointment') }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-[#082f49]"
      >
        <h2 class="text-2xl font-semibold text-[#082f49] mb-2">{{ $t('appointments.appointmentNumber') }} {{ appointment.id }}</h2>
        <p class="text-[#082f49]"><strong>{{ $t('appointments.dentistDni') }}:</strong> {{ appointment.dentist_dni }}</p>
        <p class="text-[#082f49]"><strong>{{ $t('appointments.appointmentDate') }}:</strong> {{ formatDate(appointment.appointment_date) }}</p>
        <p class="text-[#082f49]"><strong>{{ $t('appointments.reason') }}:</strong> {{ appointment.reason }}</p>
        <p class="text-[#082f49]"><strong>{{ $t('appointments.duration') }}:</strong> {{ appointment.duration_minutes }} {{ $t('appointments.minutes') }}</p>
        <p class="text-[#082f49]"><strong>{{ $t('appointments.completed') }}:</strong> {{ appointment.completed ? $t('appointments.yes') : $t('appointments.no') }}</p>
        <p class="text-[#082f49]"><strong>{{ $t('appointments.reminderSent') }}:</strong> {{ appointment.reminder_sent ? $t('appointments.yes') : $t('appointments.no') }}</p>
      </div>
    </div>

    <div
        v-if="showAddAppointmentModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-semibold text-[#082f49] mb-4">{{ $t('appointments.addNewAppointment') }}</h2>

        <form @submit.prevent="addAppointment">
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">{{ $t('appointments.dentistDni') }}</label>
            <input v-model="newAppointment.dentist_dni" type="text"
                   class="w-full border border-gray-300 rounded px-3 py-2" required/>
          </div>
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">{{ $t('appointments.patientDni') }}</label>
            <input v-model="newAppointment.patient_dni" type="text"
                   class="w-full border border-gray-300 rounded px-3 py-2" required/>
          </div>
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">{{ $t('appointments.appointmentDate') }}</label>
            <input v-model="newAppointment.appointment_date" type="datetime-local"
                   class="w-full border border-gray-300 rounded px-3 py-2" required/>
          </div>
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">{{ $t('appointments.reason') }}</label>
            <input v-model="newAppointment.reason" type="text" class="w-full border border-gray-300 rounded px-3 py-2"
                   required/>
          </div>
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">{{ $t('appointments.duration') }} ({{ $t('appointments.minutes') }})</label>
            <input v-model="newAppointment.duration_minutes" type="number"
                   class="w-full border border-gray-300 rounded px-3 py-2" required/>
          </div>
          <div class="flex justify-end">
            <button
                type="button"
                @click="showAddAppointmentModal = false"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              {{ $t('appointments.cancel') }}
            </button>
            <button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
              {{ $t('appointments.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
        v-if="showDeleteAppointmentModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-semibold text-[#082f49] mb-4">{{ $t('appointments.deleteAppointment') }}</h2>

        <form @submit.prevent="deleteAppointment">
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">{{ $t('appointments.insertId') }}</label>
            <input v-model="idAppointment" type="text"
                   class="w-full border border-gray-300 rounded px-3 py-2" required/>
          </div>
          <div class="flex justify-end">
            <button
                type="button"
                @click="showDeleteAppointmentModal = false"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              {{ $t('appointments.cancel') }}
            </button>
            <button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
              {{ $t('appointments.delete') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {AppointmentsService} from "../services/appointments.service.js";

export default {
  name: "appointment-card",
  computed: {
    ...mapGetters(['getUser']),
    username() {
      return this.getUser;
    }
  },
  data() {
    return {
      appointments: [],
      showAddAppointmentModal: false,
      showDeleteAppointmentModal: false,
      idAppointment: null,
      newAppointment: {
        dentist_dni: "",
        appointment_date: "",
        reason: "",
        duration_minutes: "",
        completed: false,
        reminder_sent: false,
        patient_dni: ""
      }
    };
  },
  methods: {
    async fetchAppointments() {
      const service = new AppointmentsService();
      this.appointments = await service.getAppointmentsByUserId(this.username.id);
    },
    formatDate(dateString) {
      const options = {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async addAppointment() {
      const service = new AppointmentsService();

      const appointmentData = {
        dentist_dni: parseInt(this.newAppointment.dentist_dni),
        user_id: this.username.id,
        appointment_date: this.newAppointment.appointment_date,
        reason: this.newAppointment.reason,
        duration_minutes: this.newAppointment.duration_minutes,
        payment_id: 0
      };


      console.log(appointmentData);
      await service.createAppointment(appointmentData, parseInt(this.newAppointment.patient_dni));

      this.showAddAppointmentModal = false;
      await this.fetchAppointments();

      this.newAppointment = {
        dentist_dni: null,
        appointment_date: "",
        reason: "",
        completed: false,
        reminder_sent: false,
        duration_minutes: null
      };
    },
    async deleteAppointment(){
      this.idAppointment = parseInt(this.idAppointment);
      const service = new AppointmentsService();
      await service.deleteAppointmentByUserId(this.username.id, this.idAppointment);
      this.showDeleteAppointmentModal = false;
    }

  },
  mounted() {
    this.fetchAppointments();
  }
};
</script>

<style scoped>
</style>
