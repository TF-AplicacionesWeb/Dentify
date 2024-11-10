<template>
  <h1 class="mt-24 text-4xl mb-5">{{ $t('Patients.header') }}</h1>
  <div class="flex justify-between">
    <pv-toolbar class="bg-[#D1F2EB] shadow-md w-4/12 rounded-3xl flex items-center justify-between p-4">
      <template #start>
        <pv-iconfield>
          <pv-inputicon class="mr-3">
            <i class="pi pi-search"/>
          </pv-inputicon>
          <pv-inputtext class="bg-[#D1F2EB] w-80" placeholder="Search"/>
        </pv-iconfield>
      </template>
      <template #end>
        <i class="pi pi-sliders-h"/>
      </template>
    </pv-toolbar>
    <button
        @click="showAddPatientModal = true"
        class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors"
    >
      Add Patient
    </button>
    <button
        @click="showDeletePatientModal = true"
        class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors"
    >
      Delete Patient
    </button>
  </div>

  <card-patients-component></card-patients-component>

  <div
      v-if="showAddPatientModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 class="text-2xl font-semibold text-[#082f49] mb-4">Add New Patient</h2>

      <form @submit.prevent="addPatient" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">First Name</label>
          <pv-inputtext v-model="newPatient.first_name" placeholder="First Name" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Last Name</label>
          <pv-inputtext v-model="newPatient.last_name" placeholder="Last Name" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Email</label>
          <pv-inputtext v-model="newPatient.email" placeholder="Email" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Age</label>
          <pv-inputtext v-model="newPatient.age" placeholder="Age" required type="number"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Medical History</label>
          <pv-inputtext v-model="newPatient.medical_history" placeholder="Medical History"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Birth Date</label>
          <input v-model="newPatient.birth_date" type="datetime-local" placeholder="Birth Date"
                 class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Record Date</label>
          <input v-model="newPatient.record_date" type="datetime-local" placeholder="Record Date"
                 class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Diagnosis</label>
          <pv-inputtext v-model="newPatient.diagnosis" placeholder="Diagnosis"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Treatment</label>
          <pv-inputtext v-model="newPatient.treatment" placeholder="Treatment"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
              type="button"
              @click="showAddPatientModal = false"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <pv-button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
            Add Patient
          </pv-button>

        </div>
      </form>
    </div>
  </div>



  <div
      v-if="showDeletePatientModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-[#082f49] mb-4">Delete Patient</h2>

      <form @submit.prevent="deletePatient">
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">Insert DNI Patient </label>
          <input v-model="dniPatient" type="text"
                 class="w-full border border-gray-300 rounded px-3 py-2" required/>
        </div>
        <div class="flex justify-end">
          <button
              type="button"
              @click="showDeletePatientModal = false"
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

</template>

<script>
import cardPatientsComponent from "../components/card-patients.component.vue";
import {PatientsService} from "../services/patients.service.js";
import {mapGetters} from "vuex";

export default {
  name: "patients.page",
  computed: {
    ...mapGetters(['getUser']),
    username() {
      return this.getUser;
    }
  },
  components: {cardPatientsComponent},
  data() {
    return {
      showAddPatientModal: false,
      showDeletePatientModal: false,
      dniPatient: null,
      newPatient: {
        first_name: "",
        last_name: "",
        email: "",
        age: null,
        medical_history: "",
        birth_date: null,
        record_date: null,
        diagnosis: "",
        treatment: ""
      },
    };
  },
  methods: {
    async addPatient() {

      const service = new PatientsService();

      const randomId = Math.floor(Math.random() * 1000000);

      let clinicalRecordId;
      do {
        clinicalRecordId = Math.floor(Math.random() * 1000000);
      } while (clinicalRecordId === randomId);

      const patientData = {
        id: randomId,
        clinical_record_id: clinicalRecordId,
        first_name: this.newPatient.first_name,
        last_name: this.newPatient.last_name,
        email: this.newPatient.email,
        age: this.newPatient.age,
        medical_history: this.newPatient.medical_history,
        birth_date: this.newPatient.birth_date,
        appointment_id: null,
        user_id: this.username.id,
      };


      const clinical_record_Data = {
        id: patientData.clinical_record_id,
        medical_history: this.newPatient.medical_history,
        record_date: this.newPatient.record_date,
        diagnosis: this.newPatient.diagnosis,
        treatment: this.newPatient.treatment,
        user_id: this.username.id,
      }


      await service.addPatient(patientData);
      await service.addClinicalRecord(clinical_record_Data);

      this.showAddPatientModal = false;
      this.newPatient = {
        first_name: "",
        last_name: "",
        email: "",
        age: null,
        medical_history: "",
        birth_date: null,
        record_date: null,
        diagnosis: "",
        treatment: ""
      };
    },

    async deletePatient() {
      try {
        const service = new PatientsService();

        this.dniPatient = parseInt(this.dniPatient);
        console.log(this.dniPatient);

        await service.deletePatientByUserId(this.username.id, this.dniPatient);


        this.showDeletePatientModal = false;
      } catch (error) {
        console.error("Error en deletePatient:", error);

      }
    }
  },
};
</script>

<style scoped>



</style>
