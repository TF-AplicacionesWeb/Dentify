<template>
  <div class="bg-[#d1f2eb] min-h-screen mt-28 p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-[#082f49]">Appointments</h1>
    </div>
    <div class="flex items-center justify-end mb-8 mx-4">
      <button
          @click="showAddAppointmentModal = true"
          class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors mx-4"
      >
        Add Appointment
      </button>

      <button
          @click="showDeleteAppointmentModal = true"
          class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors"
      >
        Delete Appointment
      </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="appointment in appointments"
            :key="appointment.id"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-[#082f49]"
        >
          <h2 class="text-2xl font-semibold text-[#082f49] mb-2">Appointment #{{ appointment.id }}</h2>
          <p class="text-[#082f49]"><strong>Dentist DNI:</strong> {{ appointment.dentist_dni }}</p>
          <p class="text-[#082f49]"><strong>Appointment Date:</strong> {{ formatDate(appointment.appointment_date) }}
          </p>
          <p class="text-[#082f49]"><strong>Reason:</strong> {{ appointment.reason }}</p>
          <p class="text-[#082f49]"><strong>Duration:</strong> {{ appointment.duration_minutes }} minutes</p>
          <p class="text-[#082f49]"><strong>Completed:</strong> {{ appointment.completed ? 'Yes' : 'No' }}</p>
          <p class="text-[#082f49]"><strong>Reminder Sent:</strong> {{ appointment.reminder_sent ? 'Yes' : 'No' }}</p>
        </div>
      </div>

      <div
          v-if="showAddAppointmentModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-2xl font-semibold text-[#082f49] mb-4">Add New Appointment</h2>

          <form @submit.prevent="addAppointment">
            <div class="mb-4">
              <label class="block text-[#082f49] mb-1">Dentist DNI</label>
              <input v-model="newAppointment.dentist_dni" type="text"
                     class="w-full border border-gray-300 rounded px-3 py-2" required/>
            </div>
            <div class="mb-4">
              <label class="block text-[#082f49] mb-1">Patient DNI</label>
              <input v-model="newAppointment.patient_dni" type="text"
                     class="w-full border border-gray-300 rounded px-3 py-2" required/>
            </div>
            <div class="mb-4">
              <label class="block text-[#082f49] mb-1">Appointment Date</label>
              <input v-model="newAppointment.appointment_date" type="datetime-local"
                     class="w-full border border-gray-300 rounded px-3 py-2" required/>
            </div>
            <div class="mb-4">
              <label class="block text-[#082f49] mb-1">Reason</label>
              <input v-model="newAppointment.reason" type="text" class="w-full border border-gray-300 rounded px-3 py-2"
                     required/>
            </div>
            <div class="mb-4">
              <label class="block text-[#082f49] mb-1">Duration (minutes)</label>
              <input v-model="newAppointment.duration_minutes" type="number"
                     class="w-full border border-gray-300 rounded px-3 py-2" required/>
            </div>
            <div class="flex justify-end">
              <button
                  type="button"
                  @click="showAddAppointmentModal = false"
                  class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
                Save
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
        <h2 class="text-2xl font-semibold text-[#082f49] mb-4">Delete Appointment</h2>

        <form @submit.prevent="deleteAppointment">
          <div class="mb-4">
            <label class="block text-[#082f49] mb-1">Insert ID Appointment </label>
            <input v-model="idAppointment" type="text"
                   class="w-full border border-gray-300 rounded px-3 py-2" required/>
          </div>
          <div class="flex justify-end">
            <button
                type="button"
                @click="showDeleteAppointmentModal = false"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
              Delete
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

      const randomId = Math.floor(Math.random() * 1000000);

      const appointmentData = {
        id: randomId,
        dentist_dni: parseInt(this.newAppointment.dentist_dni),
        user_id: this.username.id,
        appointment_date: this.newAppointment.appointment_date,
        reason: this.newAppointment.reason,
        completed: false,
        reminder_sent: false,
        duration_minutes: this.newAppointment.duration_minutes,
        payment_id: null,
        payment_status: false,
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
