<template>
  <h1 class="mt-24 text-4xl mb-5">{{ $t('mainPatient.header') }}</h1>
  <div class="flex justify-end">
    <button
        @click="showAddPatientModal = true"
        class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors mx-5"
    >
      {{ $t('mainPatient.addPatient') }}
    </button>
    <button
        @click="showDeletePatientModal = true"
        class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33] transition-colors"
    >
      {{ $t('mainPatient.deletePatient') }}
    </button>
  </div>

  <card-patients-component></card-patients-component>

  <div
      v-if="showAddPatientModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 class="text-2xl font-semibold text-[#082f49] mb-4">{{ $t('mainPatient.addNewPatient') }}</h2>

      <form @submit.prevent="addPatient" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">DNI</label>
          <pv-inputtext v-model="newPatient.dni" placeholder="dni" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.firstName') }}</label>
          <pv-inputtext v-model="newPatient.first_name" :placeholder="$t('mainPatient.firstName')" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.lastName') }}</label>
          <pv-inputtext v-model="newPatient.last_name" :placeholder="$t('mainPatient.lastName')" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.email') }}</label>
          <pv-inputtext v-model="newPatient.email" :placeholder="$t('mainPatient.email')" required
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.age') }}</label>
          <pv-inputtext v-model="newPatient.age" :placeholder="$t('mainPatient.age')" required type="number"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.medicalHistory') }}</label>
          <pv-inputtext v-model="newPatient.medical_history" :placeholder="$t('mainPatient.medicalHistory')"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.birthDate') }}</label>
          <input v-model="newPatient.birth_date" type="datetime-local" :placeholder="$t('mainPatient.birthDate')"
                 class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.recordDate') }}</label>
          <input v-model="newPatient.record_date" type="datetime-local" :placeholder="$t('mainPatient.recordDate')"
                 class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.diagnosis') }}</label>
          <pv-inputtext v-model="newPatient.diagnosis" :placeholder="$t('mainPatient.diagnosis')"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.treatment') }}</label>
          <pv-inputtext v-model="newPatient.treatment" :placeholder="$t('mainPatient.treatment')"
                        class="w-full border border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
              type="button"
              @click="showAddPatientModal = false"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            {{ $t('mainPatient.cancel') }}
          </button>
          <pv-button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
            {{ $t('mainPatient.addPatient') }}
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
      <h2 class="text-2xl font-semibold text-[#082f49] mb-4">{{ $t('mainPatient.deletePatient') }}</h2>

      <form @submit.prevent="deletePatient">
        <div class="mb-4">
          <label class="block text-[#082f49] mb-1">{{ $t('mainPatient.insertDni') }}</label>
          <input v-model="dniPatient" type="text"
                 class="w-full border border-gray-300 rounded px-3 py-2" required/>
        </div>
        <div class="flex justify-end">
          <button
              type="button"
              @click="showDeletePatientModal = false"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            {{ $t('mainPatient.cancel') }}
          </button>
          <button type="submit" class="bg-[#082f49] text-white px-4 py-2 rounded hover:bg-[#061f33]">
            {{ $t('mainPatient.delete') }}
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
      dniPatient: null,
      addDni: null,
      showAddPatientModal: false,
      showDeletePatientModal: false,
      newPatient: {
        id: 0,
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


      const clinical_record_Data = {
        id: 0,
        medical_history: this.newPatient.medical_history,
        record_date: this.newPatient.record_date,
        diagnosis: this.newPatient.diagnosis,
        treatment: this.newPatient.treatment,
        user_id: this.username.id,
      }

      const clinicalRec = await service.addClinicalRecord(clinical_record_Data);
      const clinicalRecordId = clinicalRec.id;

      const patientData = {
        id: parseInt(this.newPatient.dni),
        clinical_record_id: clinicalRecordId,
        first_name: this.newPatient.first_name,
        last_name: this.newPatient.last_name,
        email: this.newPatient.email,
        age: parseInt(this.newPatient.age),
        medical_history: this.newPatient.medical_history,
        birth_date: this.newPatient.birth_date,
        appointment_id: null,
        user_id: this.username.id,
      };

      console.log(patientData);

      await service.addPatient(patientData);


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
    },

  },
};
</script>

<style scoped>



</style>
